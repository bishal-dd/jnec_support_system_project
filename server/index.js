const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const generateRandomCode = require("./src/random_code");
const multer = require("multer");
const sharp = require("sharp");
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 10, // 10MB
  },
});
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
      const { id, username } = adminResults[0];
      req.user = { id, username, role: "admin" };
      return next();
    } else {
      db.query(workerQuery, [username, password], (err, workerResults) => {
        if (err) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (workerResults.length === 1) {
          const { id, username } = workerResults[0];
          req.user = { id, username, role: "worker" };
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
  const { id, username, role } = req.user;
  const token = jwt.sign({ id, username, role }, randomCode);

  res.json({ token });
});

app.get("/api/user", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, randomCode);
    const { id, username, role } = decoded;
    res.json({ id, username, role });
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

const MAX_IMAGE_SIZE = 10000000;

app.post("/api/issue", upload.single("issue_image"), (req, res) => {
  const { name, email, phone, issue_type, issue_summary } = req.body;

  let image = req.file ? req.file.buffer : null;
  const imageSize = image ? image.length : 0;

  if (imageSize > MAX_IMAGE_SIZE) {
    console.log("Image size exceeds the limit of 10 MB");
    res.status(400).send("Image size exceeds the limit of 10 MB");
    return;
  }
  sqlInsert =
    "INSERT INTO issue (name,email,phone,issue_image,issue_type,issue_summary) VALUES (?,?,?,?,?,?);";

  db.query(
    sqlInsert,
    [name, email, phone, image, issue_type, issue_summary],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/get_issue_table", (req, res) => {
  const sqlGet = "SELECT * FROM issue";
  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error retrieving events from database");
    } else {
      const eventsWithImages = result.map(async (issue) => {
        const imageBuffer = issue.issue_image;
        const image = sharp(imageBuffer);
        const metadata = await image.metadata();
        if (metadata.format === undefined) {
          console.log("Invalid image format");
        } else {
          const imageData = Buffer.from(imageBuffer).toString("base64");
          issue.issue_image = `data:image/${metadata.format};base64,${imageData}`;
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
    "UPDATE issue SET status = 'assigned', worker_id = ? WHERE id = ?";
  db.query(sqlUpdate, [worker_id, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating issue");
    } else {
      res.send(result);
    }
  });
});

app.post("/api/worker", (req, res) => {
  const { name, department, phone, email } = req.body;

  sqlInsert =
    "INSERT INTO add_worker (username,password,department,phone,email) VALUES (?,SHA2(?, 256),?,?,?);";
  console.log(randomCode);
  db.query(
    sqlInsert,
    [name, randomCode, department, phone, email],
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/api/get _add_worker", (req, res) => {
  sqlGet = "SELECT * FROM add_worker;";

  db.query(sqlGet, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
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
