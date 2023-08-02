const PORT = process.env.PORT ?? 8000;
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
app.use(cors());
app.use(express.json());

// GET ALL LEAGUES
app.get("/leagues", async (req, res) => {
  try {
    const leagues = await pool.query("SELECT * FROM leagues");
    res.json(leagues.rows);
  } catch (error) {
    console.error(error);
  }
});

// CREATE NEW LEAGUE
app.post("/leagues", async (req, res) => {
  const { league_name, starting_date, midway_point, end_date } = req.body;
  console.log(league_name, starting_date, midway_point, end_date);
  try {
    const newLeague = await pool.query(
      `INSERT INTO leagues(league_name, starting_date, midway_point, end_date) VALUES ($1, $2, $3, $4)`,
      [league_name, starting_date, midway_point, end_date]
    );
    res.json(newLeague);
  } catch (error) {
    console.error(err);
  }
});

//EDIT A LEAGUE

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
