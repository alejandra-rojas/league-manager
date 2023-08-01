const PORT = process.env.PORT ?? 8000;
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
app.use(cors());

// GET ALL LEAGUES
app.get("/leagues", async (req, res) => {
  try {
    const leagues = await pool.query("SELECT * FROM leagues");
    res.json(leagues.rows);
  } catch (error) {
    console.error(error);
  }
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
