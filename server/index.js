const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
  const query =
    "SELECT * FROM admin WHERE username = ? AND password = SHA2(?, 256)";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.log(results);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 1) {
      req.user = { username, role: "admin" };
      return next();
    } else {
      const query =
        "SELECT * FROM worker WHERE username = ? AND password = SHA2(?, 256)";
      db.query(query, [username, password], (err, results) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.length === 1) {
          req.user = { username, role: "worker" };
          return next();
        } else {
          return res.status(401).json({ error: "Invalid Credentials" });
        }
      });
    }
  });
}

app.post("/api/login", authenticate, (req, res) => {
  const { username, role } = req.user;
  const token = jwt.sign(
    { username, role },
    "7b2f21569c45a170cad5957133c899a4ab91eba975a4a30ee5834437c85e421adbc322464a3d8b4cf0ba83b4f0d28b1a162ae43a61073f48ea1e031c719b15bd"
  );
  console.log(token);
  res.json({ token });
});

app.get("/api/get", (req, res) => {
  res.send("hello");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
