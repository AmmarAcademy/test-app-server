const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Handle form submission
app.post('/submit', async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ message: 'Username is required' });

  try {
    await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username TEXT)');
    await pool.query('INSERT INTO users(username) VALUES($1)', [username]);
    res.json({ message: `Success! Your name (${username}) has been saved.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving to database' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

