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

app.get("/api/get", (req, res) => {
  res.send("hello");
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
