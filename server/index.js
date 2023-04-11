const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const generateRandomCode = require("./src/random_code");

const randomCode = generateRandomCode();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "student@2021",
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
      req.user = { username, role: "admin" };
      return next();
    } else {
      db.query(workerQuery, [username, password], (err, workerResults) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (workerResults.length === 1) {
          req.user = { username, role: "worker" };
          return next();
        } else {
          db.query(viewerQuery, [username, password], (err, viewerResults) => {
            if (err) {
              return res.status(500).json({ error: "Internal Server Error" });
            }
            if (viewerResults.length === 1) {
              req.user = { username, role: "viewer" };
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
  const { username, role } = req.user;
  const token = jwt.sign({ username, role }, randomCode);
  console.log(token);
  res.json({ token });
});

app.get("/api/user", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, randomCode);
    const { username, role } = decoded;
    res.json({ username, role });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.post("/api/issue_table", (req, res) => {
  console.log(req.body);
  const { name, email, phone, issue_summary } = req.body;
  console.log(name);

  sqlInsert =
    "INSERT INTO issue_table (name,email,phone,issue_summary) VALUES (?,?,?,?);";

  db.query(sqlInsert, [name, email, phone, issue_summary], (error, result) => {
    if (error) {
      console.log(error);
    } else {
    }
  });
});

app.get("/api/get_issue", (req, res) => {
  sqlGet = "SELECT * FROM issue;";

  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/api/addworker",(req, res) => {
  console.log(req.body);
  const { name, department, phone, email } = req.body;
  console.log(name);

  sqlInsert =
    "INSERT INTO addworker (name,department,phone,email) VALUES (?,?,?,?);";

    db.query(sqlInsert, [name, department, phone, email], (error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result)
      }
    });
});

app.get("/api/get_addworker", (req, res) => {
  sqlGet = "SELECT * FROM addworker;";

  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});



app.get("/api/get", (req, res) => {
  res.send("hello");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
