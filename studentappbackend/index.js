const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for all routes and origins
app.use(cors());
app.use(express.json());

// MySQL database configuration
const db = mysql.createConnection({
  host: '62.84.179.198',
  user: 'root',
  password: 'Secure123!', // Set your MySQL root password
  database: 'student_management' // Make sure this database exists
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database.');
});

// Create student
// POST /students - Create a new student
app.post('/students', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { name, age } = req.body;
  if (!name || !age) {
    return res.status(400).json({ error: 'Name and age are required' });
  }
  db.query('INSERT INTO students (name, age) VALUES (?, ?)', [name, age], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, name, age });
  });
});

// Get all students
// GET /students - Retrieve all students
app.get('/students', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  db.query('SELECT * FROM students', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
