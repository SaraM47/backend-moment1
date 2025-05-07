// Importing necessary modules
const express = require("express");
const sqlite3 = require("sqlite3").verbose(); // SQLite with detailed logging support
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000; // Uses environment variable or default port 3000

// Connecting to the SQLite database
const db = new sqlite3.Database("./db/cv.db", (err) => {
  if (err) console.error(err.message);
  else console.log("Connected to SQLite database.");
});

// Creates the 'courses' table if it doesn't already exist
db.run(`
  CREATE TABLE IF NOT EXISTS courses (
    courseid INTEGER PRIMARY KEY AUTOINCREMENT,
    coursecode TEXT NOT NULL,
    coursename TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    progression TEXT NOT NULL
  )
`);

// Configures middleware
app.set("view engine", "ejs"); // Uses EJS as view engine
app.use(express.static(path.join(__dirname, "public"))); // Serves static files from the 'public' folder
app.use(bodyParser.urlencoded({ extended: false })); // Loads form data from POST call

// ROUTES

// Home page – shows all courses
app.get("/", (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) throw err;
    res.render("index", { courses: rows }); // Sends the course list to index.ejs
  });
});

// GET /add – displays the form for adding a course
app.get("/add", (req, res) => {
  res.render("add", { error: null }); // Sends with any error text (initially null)
});

// POST /add – handles form data and adds new course
app.post("/add", (req, res) => {
  const { coursecode, coursename, syllabus, progression } = req.body;

  // Simple validation – all fields are required
  if (!coursecode || !coursename || !syllabus || !progression) {
    return res.render("add", { error: "All fields are required!" });
  }

  // Adds course to database
  db.run(
    `INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES (?, ?, ?, ?)`,
    [coursecode, coursename, syllabus, progression],
    (err) => {
      if (err) throw err;
      res.redirect("/"); // Sends the user back to the home page
    }
  );
});

// GET /delete/:id – deletes course with certain ID
app.get("/delete/:id", (req, res) => {
  db.run(`DELETE FROM courses WHERE courseid = ?`, [req.params.id], (err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

// GET /about – shows the information page
app.get("/about", (req, res) => {
  res.render("about"); // Renders about.ejs
});

// Starts the server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
