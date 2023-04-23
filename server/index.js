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
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10MB
  },
});
const adminMail = "05210218.jnec@rub.edu.bt";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: adminMail,
    pass: "wweisbest1234@",
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
          const { id, username, department } = workerResults[0];
          req.user = { id, username, department, role: "worker" };
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
  const { id, username, department, role } = req.user;
  const token = jwt.sign({ id, username, department, role }, randomCode);

  res.json({ token });
});

app.get("/api/user", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json("Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, randomCode);
    const { id, username, department, role } = decoded;
    res.json({ id, username, department, role });
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
        transporter.sendMail({
          from: adminMail,
          to: adminMail,
          subject: "New Issue",
          text: "New Issue was submited",
        });
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
              from: "05210218.jnec@rub.edu.bt",
              to: `${response[0].email}`,
              subject: "Work assignment",
              text: `you have been assigned work new work which is ${issue_res[0].name}`,
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
        transporter.sendMail({
          from: "05210218.jnec@rub.edu.bt",
          to: `${issue_res[0].email}, ${adminMail}`,
          subject: "Work assignment",
          text: `This issue has been solved`,
        });
      });

      res.send("Solved");
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
          subject: "You have been added",
          text: " you have been added to the jnec support system",
          text: `username: ${name}, password: ${randomCode}`,
        });

        res.send("Worker Added");
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

  console.log(name);

  sqlInsert =
    "UPDATE worker SET username = ?, department = ? ,phone = ?, email= ? WHERE id = ?";

  db.query(
    sqlInsert,
    [name, department, phone, email, Number(id)],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send("edit sucess");
      }
    }
  );
});

app.get("/api/delete/:id", (req, res) => {
  const sqlDelete = "DELETE FROM worker WHERE id = ?;";
  console.log(req.params.id);

  db.query(sqlDelete, [req.params.id], (err, result) => {
    console.log(result);
    res.send("Worker Deleted");
  });
});

app.post("/api/check-status", (req, res) => {
  const ticketNumber = req.body.ticketNumber;
  const statuses = ["Pending", "Solved"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  const status = statuses[randomIndex];

  res.send({ status });
});
app.get("/api/get", (req, res) => {
  res.send("hello");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
