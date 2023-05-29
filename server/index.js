const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const generateRandomCode = require("./src/random_code");
const multer = require("multer");
const sharp = require("sharp");
const nodemailer = require("nodemailer");
const storage = multer.memoryStorage();
const randomCode = generateRandomCode();
const config = require("./config");
// const fs = require("fs");
// const https = require("https");
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10MB
  },
});

const port = 8080;

// all the email addresses
const adminMail = "helpdeskjnec@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: adminMail,
    pass: "vqeinearebwctyph",
  },
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "wweisbest1234@",
  database: "projectdb",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err);
    return;
  }
  console.log("Connected to the MySQL database!");
});

function authenticate(req, res, next) {
  const { username, password } = req.body;
  const adminQuery =
    "SELECT * FROM admin WHERE username = ? AND password = SHA2(?, 256)";
  const workerQuery =
    "SELECT * FROM worker WHERE username = ? AND password = SHA2(?, 256)";
  const viewerQuery =
    "SELECT * FROM viewer WHERE username = ? AND password = SHA2(?, 256)";

  db.query(adminQuery, [username, password], (err, adminResults) => {
    if (err) {
      console.log(adminResults);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (adminResults.length === 1) {
      const { id, username, department } = adminResults[0];
      if (department === "super_admin") {
        req.user = { id, username, department, role: "super_admin" };
      } else {
        req.user = { id, username, department, role: "admin" };
      }
      return next();
    } else {
      db.query(workerQuery, [username, password], (err, workerResults) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (workerResults.length === 1) {
          const { id, username, department, status } = workerResults[0];
          req.user = { id, username, department, status, role: "worker" };
          return next();
        } else {
          db.query(viewerQuery, [username, password], (err, viewerResults) => {
            if (err) {
              return res.status(500).json({ error: "Internal Server Error" });
            }
            if (viewerResults.length === 1) {
              const { id, username } = viewerResults[0];
              req.user = { id, username, role: "viewer" };
              return next();
            } else {
              return res.status(401).json({ error: "Invalid Credentials" });
            }
          });
        }
      });
    }
  });
}

app.post("/api/login", authenticate, (req, res) => {
  const { id, username, department, status, role } = req.user;
  const token = jwt.sign(
    { id, username, department, status, role },
    randomCode
  );

  res.json({ token });
});

app.get("/api/user", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json("Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, randomCode);
    const { id, username, department, status, role } = decoded;
    res.json({ id, username, department, status, role });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

const MAX_IMAGE_SIZE = 10000000;

app.post("/api/issue", upload.single("issue_image"), (req, res) => {
  const { name, email, phone, issue_type, issue_summary } = req.body;

  let image = req.file ? req.file.buffer : null;
  const imageSize = image ? image.length : 0;

  const currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1; // 0-11, where 0 is January
  month = month < 10 ? "0" + month : month; // Add leading zero if month is a single digit
  let day = currentDate.getDate();
  const date = `${year}-${month}-${day}`;

  if (imageSize > MAX_IMAGE_SIZE) {
    console.log("Image size exceeds the limit of 10 MB");
    res.status(400).send("Image size exceeds the limit of 10 MB");
    return;
  }

  const sqlInsert =
    "INSERT INTO issue (name, email, phone, issue_image, issue_type, issue_summary, issue_date) VALUES (?, ?, ?, ?, ?, ?, ?);";
  const sqlSelectAdminEmail = "SELECT email FROM admin WHERE department = ?;";
  const sqlSelectSuperAdminEmail =
    "SELECT email FROM admin WHERE department = 'super_admin';";

  db.query(
    sqlInsert,
    [name, email, phone, image, issue_type, issue_summary, date],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        db.query(sqlSelectAdminEmail, [issue_type], (error, adminResult) => {
          if (error) {
            console.log(error);
          } else {
            const adminEmail = adminResult[0].email;

            db.query(sqlSelectSuperAdminEmail, (error, superAdminResult) => {
              if (error) {
                console.log(error);
              } else {
                const superAdminEmail = superAdminResult[0].email;

                try {
                  transporter.sendMail({
                    from: superAdminEmail,
                    to: adminEmail,
                    subject: "New Issue was submitted",
                    html: `<strong>A new issue regarding '${issue_summary}' was submitted to the helpdesk.</strong><br>
                           You can login to check the details and take necessary actions: <a href="${config.SERVER_URL}login/">here</a>`,
                  });

                  transporter.sendMail({
                    from: superAdminEmail,
                    to: email,
                    subject: "Your Issue was submitted",
                    html: `<strong>Your issue '${issue_summary}' was submitted successfully.</strong><br>
                           If you want to check the status of your issue, <a href="${config.SERVER_URL}check/">you can click this link</a> and enter your Issue ID: <b>${result.insertId}</b>.`,
                  });
                } catch (error) {
                  console.log("Email cannot be sent:", error);
                }
              }
            });
          }
        });

        res.send("Issue submitted");
      }
    }
  );
});

app.get("/api/get_issue", (req, res) => {
  const sqlGet = "SELECT * FROM issue";
  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving events from database");
    } else {
      const eventsWithImages = result.map(async (issue) => {
        if (issue.issue_image) {
          const imageBuffer = issue.issue_image;
          const image = sharp(imageBuffer);
          const metadata = await image.metadata();
          if (metadata.format === undefined) {
            console.log("Invalid image format");
          } else {
            const imageData = Buffer.from(imageBuffer).toString("base64");
            issue.issue_image = `data:image/${metadata.format};base64,${imageData}`;
          }
        }

        return issue;
      });

      Promise.all(eventsWithImages)
        .then((results) => {
          res.send(results);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send("Error processing images");
        });
    }
  });
});

app.put("/api/assign_issue/:id", (req, res) => {
  const { id, worker_id } = req.body;
  const sqlUpdate =
    "UPDATE issue SET status = 'assigned',worker_id = ? WHERE id = ?;";
  db.query(sqlUpdate, [worker_id, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating issue");
    } else {
      const sqlGetAdminMail = "SELECT email FROM admin;";
      db.query(sqlGetAdminMail, (err, adminResult) => {
        if (err) {
          console.log(err);
        } else {
          const adminMail = adminResult[0].email;

          const sqlGetWorkerMail = "SELECT email FROM worker WHERE id = ?;";
          db.query(sqlGetWorkerMail, [worker_id], (err, workerResult) => {
            if (err) {
              console.log(err);
            } else {
              const workerEmail = workerResult[0].email;
              const get_issue = "SELECT * FROM issue WHERE id = ?;";
              db.query(get_issue, [id], (err, issue_res) => {
                transporter.sendMail({
                  from: adminMail,
                  to: workerEmail,
                  subject: "Work Assignment",
                  html: `You have been assigned work: '${issue_res[0].issue_summary}'<br>
                         Please login to check the details and start working on the assigned task <a href="${config.SERVER_URL}login/">here</a>.`,
                });
              });
            }
          });
        }
      });

      res.send("Assigned");
    }
  });
});

app.put("/api/assign_solved/:id", (req, res) => {
  const { id, worker_id } = req.body;

  const sqlUpdate = "UPDATE issue SET status = 'solved' WHERE id = ?";
  db.query(sqlUpdate, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating issue");
    } else {
      const get_issue = "SELECT * FROM issue WHERE id = ?;";
      db.query(get_issue, [id], (err, issue_res) => {
        const get_email = "SELECT email FROM admin WHERE department = ?;";
        db.query(get_email, [issue_res[0].issue_type], (err, admin_email) => {
          transporter.sendMail({
            from: adminMail,
            to: `${issue_res[0].email}, ${admin_email[0].email}`,
            subject: "Resolved Issue",
            html: `<b>The issue '${issue_res[0].issue_summary}' that was submitted on ${issue_res[0].issue_date} has been resolved.</b>`,
          });
        });
      });

      res.send("Solved");
    }
  });
});

app.put("/api/assign_working/:id", (req, res) => {
  const { id, worker_id } = req.body;

  const sqlUpdate = "UPDATE issue SET status = 'working' WHERE id = ?";
  db.query(sqlUpdate, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating issue");
    } else {
      const get_issue = "SELECT * FROM issue WHERE id = ?;";
      db.query(get_issue, [id], (err, issue_res) => {
        const get_email = "SELECT email FROM admin WHERE department = ?;";
        db.query(get_email, [issue_res[0].issue_type], (err, admin_email) => {
          transporter.sendMail({
            from: adminMail,
            to: `${issue_res[0].email}, ${admin_email[0].email}`,
            subject: "Issue Status",
            html: `<b>The issue '${issue_res[0].issue_summary}' that was submitted on ${issue_res[0].issue_date} is currently being worked on.</b>`,
          });
        });
      });

      res.send("Working");
    }
  });
});

app.put("/api/foward_issue/:id", (req, res) => {
  const { id, department } = req.body;

  const sqlUpdate = `UPDATE issue SET issue_type = '${department}' WHERE id = ?`;
  db.query(sqlUpdate, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating issue");
    } else {
      const get_issue = "SELECT * FROM issue WHERE id = ?;";
      db.query(get_issue, [id], (err, issue_res) => {
        const get_email = "SELECT email FROM admin WHERE department = ?;";
        db.query(get_email, [issue_res[0].issue_type], (err, admin_email) => {
          transporter.sendMail({
            from: adminMail,
            to: admin_email[0].email,
            subject: "Forwarded Issue",
            html: `<b>The issue '${issue_res[0].issue_summary}' that was submitted on ${issue_res[0].issue_date} has been forwarded to your department for further handling.</b>`,
          });
        });
      });

      res.send("Fowarded");
    }
  });
});

app.post("/api/worker", (req, res) => {
  const { name, department, phone, email } = req.body;

  sqlInsert =
    "INSERT INTO worker ( username,password,department,phone,email) VALUES (?,SHA2(?, 256),?,?,?);";
  db.query(
    sqlInsert,
    [name, randomCode, department, phone, email],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        transporter.sendMail({
          from: adminMail,
          to: email,
          subject: "Welcome to the Helpdesk",
          html: `Welcome to the Helpdesk!<br>
          You have been added as a user.<br><br>
          To access the helpdesk, please use the following login credentials:<br>
          Username: ${name}<br>
          Password: ${randomCode}<br><br>
          You can log in to the helpdesk system <a href=${config.SERVER_URL}login/>here</a> and check if any issues have been assigned to you.<br><br>
          `,
        });

        res.send("Staff Added");
      }
    }
  );
});

app.get("/api/get_worker", (req, res) => {
  sqlGet = "SELECT * FROM worker;";

  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/api/get_admin", (req, res) => {
  sqlGet = "SELECT * FROM admin;";

  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/editadmin/:id", (req, res) => {
  const { name, email } = req.body;

  const id = req.params.id;

  sqlInsert = "UPDATE admin SET username = ?,  email= ? WHERE id = ?";

  db.query(sqlInsert, [name, email, Number(id)], (error, result) => {
    if (error) {
      console.log(error);
    } else {
      res.send("Edit sucess");
    }
  });
});

app.put("/api/editworker/:id", (req, res) => {
  const { name, department, phone, email } = req.body;

  const id = req.params.id;

  sqlInsert =
    "UPDATE worker SET username = ?, department = ? ,phone = ?, email= ? WHERE id = ?";

  db.query(
    sqlInsert,
    [name, department, phone, email, Number(id)],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("Edit sucess");
      }
    }
  );
});

app.get("/api/delete/:id", (req, res) => {
  const sqlDelete = "DELETE FROM worker WHERE id = ?;";

  db.query(sqlDelete, [req.params.id], (err, result) => {
    res.send("Worker Deleted");
  });
});

// // Configure HTTPS options
// const httpsOptions = {
//   cert: fs.readFileSync("certificate/fullchain.pem"),
//   key: fs.readFileSync("certificate/privkey.pem"),
// };

// Create HTTPS server
// const server = https.createServer(httpsOptions, app);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
