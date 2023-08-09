const PORT = process.env.PORT ?? 8000;
const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
      "INSERT INTO leagues(league_name, starting_date, midway_point, end_date) VALUES ($1, $2, $3, $4)",
      [league_name, starting_date, midway_point, end_date]
    );
    res.json(newLeague);
  } catch (error) {
    console.error(err);
  }
});

//EDIT A LEAGUE
app.put("/leagues/:id", async (req, res) => {
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
app.delete("/leagues/:id", async (req, res) => {
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

//ADMIN LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await pool.query(
      "SELECT * FROM admin_users WHERE admin_email = $1",
      [email]
    );

    console.log(users);
    if (!users.rows.length)
      return res.json({ detail: "Admin user does not exist." });

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if (success) {
      res.json({ email: users.rows[0].admin_email, token });
    } else {
      res.json({ detail: "Login failed. Try again!" });
    }
  } catch (error) {
    console.error(error);
  }
});

//ADMIN SIGNUP
app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  try {
    const signUp = await pool.query(
      "INSERT INTO admin_users (admin_email, hashed_password) VALUES ($1, $2)",
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "2hr" });

    res.json({ email, token });
  } catch (err) {
    console.error(err);
    if (err) {
      res.json({ detail: err.detail });
    }
  }
});

// GET ALL EVENTS FOR ONE LEAGUE
app.get("/leagues/:id/events", async (req, res) => {
  const leagueId = req.params.id; // Extract the league ID from the request URL
  try {
    const events = await pool.query(
      "SELECT event_id, event_name, participating_teams FROM events WHERE league_id = $1",
      [leagueId]
    );
    res.json(events.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// CREATE NEW EVENT
app.post("/leagues/:id/events", async (req, res) => {
  const { event_name } = req.body;
  const leagueId = req.params.id; // Extract the league ID from the request URL
  console.log(event_name);
  try {
    const newEvent = await pool.query(
      "INSERT INTO events(league_id, event_name) VALUES ($1, $2)",
      [leagueId, event_name]
    );
    res.json(newEvent);
  } catch (error) {
    console.error(error);
  }
});

// GET ALL EVENTS
app.get("/events", async (req, res) => {
  try {
    const events = await pool.query("SELECT * FROM events");
    res.json(events.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//EDIT EVENT
app.put("/events/:id", async (req, res) => {
  const { id } = req.params;
  const { event_name } = req.body;
  try {
    const editEvent = await pool.query(
      "UPDATE events SET event_name = $1 WHERE event_id = $2;",
      [event_name, id]
    );
    res.json(editEvent);
  } catch (error) {
    console.error(error);
  }

  /*   const { id } = req.params;
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
  } */
});

//DELETE EVENT
app.delete("/events/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteEvent = await pool.query(
      "DELETE FROM events WHERE event_id = $1;",
      [id]
    );
    res.json(deleteEvent);
  } catch (error) {
    console.error(error);
  }
});

//ALL PLAYERS
app.get("/players", async (req, res) => {
  try {
    const players = await pool.query("SELECT * FROM players");
    res.json(players.rows);
  } catch (error) {
    console.error(err.message);
  }
});

//GET A SINGLE PLAYER
app.get("/players/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const player = await pool.query(
      "SELECT * FROM players WHERE player_id = $1",
      [id]
    );
    res.json(player.rows);
  } catch (error) {
    console.log("UPDATE ERROR");
    console.error(error);
  }
});

//PLAYERS SEARCH
// player_firstname player_lastname => %{}%
// || is used in sql to concat
// ILIKE case insensitive
app.get("/searchplayers", async (req, res) => {
  const { name } = req.query;
  try {
    const players = await pool.query(
      "SELECT * FROM players WHERE player_firstname || ' ' || player_lastname ILIKE $1",
      [`%${name}%`]
    );
    res.json(players.rows);
  } catch (error) {
    console.error(err.message);
  }
});

//TEAMS SEARCH
app.get("/teams", async (req, res) => {
  const { name } = req.query;

  try {
    const query = `
      SELECT
          t.team_id,
          t.player1_id,
          p1.player_firstname AS player1_firstname,
          p1.player_lastname AS player1_lastname,
          t.player2_id,
          p2.player_firstname AS player2_firstname,
          p2.player_lastname AS player2_lastname
      FROM
          teams t
      JOIN
          players p1 ON t.player1_id = p1.player_id
      JOIN
          players p2 ON t.player2_id = p2.player_id
      WHERE
          p1.player_firstname ILIKE $1 OR p1.player_lastname ILIKE $1
          OR
          p2.player_firstname ILIKE $1 OR p2.player_lastname ILIKE $1;
    `;

    const values = [`%${name}%`];

    const teamsResult = await pool.query(query, values);

    res.json(teamsResult.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// GET ALL TEAMS FOR ONE EVENT
app.get("/events/:id/teams", async (req, res) => {
  const eventId = req.params.id; // Extract the league ID from the request URL
  try {
    const query = `
      SELECT
          et.event_id,
          et.team_id,
          p1.player_firstname AS player1_firstname,
          p1.player_lastname AS player1_lastname,
          p2.player_firstname AS player2_firstname,
          p2.player_lastname AS player2_lastname
      FROM
          event_teams et
      JOIN
          teams t ON et.team_id = t.team_id
      JOIN
          players p1 ON t.player1_id = p1.player_id
      JOIN
          players p2 ON t.player2_id = p2.player_id
      WHERE
          et.event_id = $1;
    `;

    const result = await pool.query(query, [eventId]);

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//ASSOCIATE TEAM TO EVENT
app.post("/events/:id/teams", async (req, res) => {
  const { team_id } = req.body;
  const eventId = req.params.id;

  console.log(eventId, team_id);
  try {
    const addingTeam = await pool.query(
      "INSERT INTO event_teams(event_id, team_id) VALUES ($1, $2)",
      [eventId, team_id]
    );
    res.json(addingTeam);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "An error occurred while adding the team to the event.",
    });
  }
});

//DELETE TEAM FROM EVENT
app.delete("/events/:id/teams/:tid", async (req, res) => {
  const { id, tid } = req.params;

  try {
    const deleteTeamFromEvent = await pool.query(
      "DELETE FROM event_teams WHERE event_id = $1 AND team_id = $2",
      [id, tid]
    );

    res.json(deleteTeamFromEvent);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
