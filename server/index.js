const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wweisbest1234@",
  database: "ProjectDB",
});

app.get("/api/get", (req, res) => {
  res.send("hello");
});
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
