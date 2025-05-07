// Importerar nödvändiga moduler
const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // SQLite med stöd för detaljerad loggning
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; // Använder miljövariabel eller standardport 3000

// Anslutning till SQLite-databasen
const db = new sqlite3.Database('./db/cv.db', (err) => {
  if (err) console.error(err.message);
  else console.log('Connected to SQLite database.');
});

// Skapar tabellen 'courses' om den inte redan finns
db.run(`
  CREATE TABLE IF NOT EXISTS courses (
    courseid INTEGER PRIMARY KEY AUTOINCREMENT,
    coursecode TEXT NOT NULL,
    coursename TEXT NOT NULL,
    syllabus TEXT NOT NULL,
    progression TEXT NOT NULL
  )
`);

// Konfigurerar middleware
app.set('view engine', 'ejs'); // Använder EJS som vy-motor
app.use(express.static(path.join(__dirname, 'public'))); // Servar statiska filer från mappen 'public'
app.use(bodyParser.urlencoded({ extended: false })); // Läser in formulärdata från POST-anrop

// ROUTES

// Startsidan – visar alla kurser
app.get('/', (req, res) => {
  db.all("SELECT * FROM courses", [], (err, rows) => {
    if (err) throw err;
    res.render('index', { courses: rows }); // Skickar kurslistan till index.ejs
  });
});

// GET /add – visar formuläret för att lägga till kurs
app.get('/add', (req, res) => {
  res.render('add', { error: null }); // Skickar med eventuell feltext (initialt null)
});

// POST /add – hanterar formulärdata och lägger till ny kurs
app.post('/add', (req, res) => {
  const { coursecode, coursename, syllabus, progression } = req.body;

  // Enkel validering – alla fält krävs
  if (!coursecode || !coursename || !syllabus || !progression) {
    return res.render('add', { error: "All fields are required!" });
  }

  // Lägger till kurs i databasen
  db.run(
    `INSERT INTO courses (coursecode, coursename, syllabus, progression) VALUES (?, ?, ?, ?)`,
    [coursecode, coursename, syllabus, progression],
    (err) => {
      if (err) throw err;
      res.redirect('/'); // Skickar användaren tillbaka till startsidan
    }
  );
});

// GET /delete/:id – tar bort kurs med visst ID
app.get('/delete/:id', (req, res) => {
  db.run(`DELETE FROM courses WHERE courseid = ?`, [req.params.id], (err) => {
    if (err) throw err;
    res.redirect('/'); // Efter radering – tillbaka till startsidan
  });
});

// GET /about – visar informationssidan
app.get('/about', (req, res) => {
  res.render('about'); // Renderar about.ejs
});

// Startar servern
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
