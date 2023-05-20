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
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10MB
  },
});

// all the email addresses
const adminMail = "helpdeskjnec@gmail.com";
let subadminmail = "";
let ICTmail = "dhakalbishal930@gmail.com";
let estatemail = "dhakalbishal224@gmail.com";
let academicmail = "05210218.jnec@rub.edu.bt";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: adminMail,
    pass: "vqeinearebwctyph",
  },
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wweisbest1234@",
  database: "ProjectDB",
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
      req.user = { id, username, department, role: "admin" };
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
  sqlInsert =
    "INSERT INTO issue (name,email,phone,issue_image,issue_type,issue_summary, issue_date) VALUES (?,?,?,?,?,?,?);";

  db.query(
    sqlInsert,
    [name, email, phone, image, issue_type, issue_summary, date],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        if (issue_type === "ICT") {
          subadminmail = ICTmail;
        } else if (issue_type === "estate") {
          subadminmail = estatemail;
        } else {
          subadminmail = academicmail;
        }
        try {
          transporter.sendMail({
            from: adminMail,
            to: subadminmail,
            subject: "New Issue was submitted",
            html: `<strong>New Issue regarding '${issue_summary}' was submitted to the helpdesk</strong><br>
                   You can login to check : <a href=${config.SERVER_URL}login/>${config.SERVER_URL}login/</a>`,
          });

          transporter.sendMail({
            from: adminMail,
            to: email,
            subject: "Your Issue was submitted",
            html: `<strong>Your Issue '${issue_summary}'  was submitted.</strong><br>
                   If you want to check the status, <a href="${config.SERVER_URL}check/">you can click this link</a> and enter your IssueID:<b>${result.insertId}</b>`,
          });
        } catch (error) {
          alert("Email cannot be send");
        }

        res.send("issue submited");
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
      const sqlGet = "SELECT email FROM worker WHERE id = ?;";
      db.query(sqlGet, [worker_id], (err, response) => {
        if (err) {
          console.log(err);
        } else {
          const get_issue = "SELECT * FROM issue WHERE id = ?;";
          db.query(get_issue, [id], (err, issue_res) => {
            transporter.sendMail({
              from: adminMail,
              to: `${response[0].email}`,
              subject: "Work assignment",
              html: `You have been assigned work '${issue_res[0].issue_summary}'<br>
              You can login to check <a href=${config.SERVER_URL}login/>${config.SERVER_URL}login/</a>`,
            });
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
        if (issue_res[0].issue_type === "ICT") {
          subadminmail = ICTmail;
        } else if (issue_res[0].issue_type === "estate") {
          subadminmail = estatemail;
        } else {
          subadminmail = academicmail;
        }
        transporter.sendMail({
          from: "05210218.jnec@rub.edu.bt",
          to: `${issue_res[0].email}, ${subadminmail}`,
          subject: "Resolved Issue",
          html: `<b>The issue '${issue_res[0].issue_summary}' which was submitted on ${issue_res[0].issue_date} is solved.</b>`,
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
        if (issue_res[0].issue_type === "ICT") {
          subadminmail = ICTmail;
        } else if (issue_res[0].issue_type === "estate") {
          subadminmail = estatemail;
        } else {
          subadminmail = academicmail;
        }
        transporter.sendMail({
          from: adminMail,
          to: `${issue_res[0].email}, ${subadminmail}`,
          subject: "Issue Status",
          html: `<b>The issue '${issue_res[0].issue_summary}' which was submitted on ${issue_res[0].issue_date} is being worked on</b>`,
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
        if (issue_res[0].issue_type === "ICT") {
          subadminmail = ICTmail;
        } else if (issue_res[0].issue_type === "estate") {
          subadminmail = estatemail;
        } else {
          subadminmail = academicmail;
        }
        transporter.sendMail({
          from: adminMail,
          to: subadminmail,
          subject: "Fowarded ",
          html: `<b>The issue '${issue_res[0].issue_summary}' which was submitted on ${issue_res[0].issue_date} is being fowarded to your department</b>`,
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
  console.log(randomCode);
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
          subject: "Added to the helpdesk",
          html: `You have been added to the helpdesk <br> 
          You can use the following username and password to login and check if you have any issues assigned here:
          <a href=${config.SERVER_URL}login/>${config.SERVER_URL}login/</a><br>
          <b>Username: ${name}, Password: ${randomCode}</b>`,
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
    console.log(result);
    res.send("Worker Deleted");
  });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
