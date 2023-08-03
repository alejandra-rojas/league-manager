const express = require("express");
const router = express.Router();
const pool = require("../db");
router.use(express.json());

// GET ALL LEAGUES
router.get("/leagues", async (req, res) => {
  try {
    const leagues = await pool.query("SELECT * FROM leagues");
    res.json(leagues.rows);
  } catch (error) {
    console.error(error);
  }
});

// CREATE NEW LEAGUE
router.post("/leagues", async (req, res) => {
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
router.put("/leagues/:id", async (req, res) => {
  const { id } = req.params;
  const { league_name, starting_date, midway_point, end_date, isfinished } =
    req.body;
  try {
    const editLeague = await pool.query(
      "UPDATE leagues SET league_name = $1, starting_date = $2, midway_point = $3, end_date = $4, isfinished = $5 WHERE id = $6;",
      [league_name, starting_date, midway_point, end_date, isfinished, id]
    );
    res.json(editLeague);
  } catch (error) {
    console.log("UPDATE ERROR");
    console.error(error);
  }
});

//DELETE A LEAGUE
router.delete("/leagues/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteLeague = await pool.query(
      "DELETE FROM leagues WHERE id = $1;",
      [id]
    );
    res.json(deleteLeague);
  } catch (error) {
    console.error(error);
  }
});

module.export = router;
