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
  try {
    const newLeague = await pool.query(
      "INSERT INTO leagues(league_name, starting_date, midway_point, end_date) VALUES ($1, $2, $3, $4)",
      [league_name, starting_date, midway_point, end_date]
    );
    res.json(newLeague);
  } catch (error) {
    console.log("CREATE NEW LEAGUE ERROR");
    console.error(error);
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
    console.log(`league ${id} deleted`);
  } catch (error) {
    console.log("DELETE ERROR");
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
      "SELECT * FROM events WHERE league_id = $1",
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
  const { event_name, midway_matches } = req.body;
  const leagueId = req.params.id; // Extract the league ID from the request URL
  console.log(event_name);
  try {
    const newEvent = await pool.query(
      "INSERT INTO events(league_id, event_name, midway_matches) VALUES ($1, $2, $3)",
      [leagueId, event_name, midway_matches]
    );
    res.json(newEvent);
  } catch (error) {
    console.log("NEW EVENT ERROR");
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
  const { event_name, midway_matches } = req.body;
  try {
    const editEvent = await pool.query(
      "UPDATE events SET event_name = $1, midway_matches = $2 WHERE event_id = $3;",
      [event_name, midway_matches, id]
    );
    res.json(editEvent);
  } catch (error) {
    console.log("EDIT EVENT ERROR");
    console.error(error);
  }
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
    console.log("DELETE EVENT ERROR");
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

// CREATE NEW PLAYER
app.post("/players", async (req, res) => {
  const {
    player_firstname,
    player_lastname,
    player_phonenumber,
    player_email,
  } = req.body;
  try {
    const newPLayer = await pool.query(
      "INSERT INTO players(player_firstname, player_lastname, player_phonenumber, player_email) VALUES ($1, $2, $3, $4)",
      [player_firstname, player_lastname, player_phonenumber, player_email]
    );
    res.json(newPLayer);
  } catch (error) {
    console.error(error);
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
  const eventId = req.params.id;

  try {
    const query = `
      SELECT
          et.event_id,
          et.team_id,
          et.all_bonus,
          et.mid_bonus,
          et.challenger_bonus,
          et.team_withdrawn,
          p1.player_firstname AS player1_firstname,
          p1.player_lastname AS player1_lastname,
          p2.player_firstname AS player2_firstname,
          p2.player_lastname AS player2_lastname,
          COUNT(DISTINCT m.match_id) AS total_matches,
          COUNT(DISTINCT CASE WHEN m.isFinished THEN m.match_id END) AS played_matches,
          COUNT(DISTINCT CASE WHEN m.isFinished AND m.match_date <= l.midway_point THEN m.match_id END) AS matchesbefore_midway,
          COUNT(DISTINCT CASE WHEN m.winner_id = t.team_id THEN m.match_id END) AS team_wins,
          SUM(CASE 
            WHEN m.team1_id = t.team_id THEN m.team1_sets 
            WHEN m.team2_id = t.team_id THEN m.team2_sets
            ELSE 0
          END) AS team_sets_won
      FROM
          event_teams et
      JOIN
          teams t ON et.team_id = t.team_id
      JOIN
          players p1 ON t.player1_id = p1.player_id
      JOIN
          players p2 ON t.player2_id = p2.player_id
      LEFT JOIN
          matches m ON (m.team1_id = t.team_id OR m.team2_id = t.team_id) AND m.event_id = et.event_id
      JOIN
          events e ON et.event_id = e.event_id
      JOIN
          leagues l ON e.league_id = l.id
      WHERE
          et.event_id = $1
      GROUP BY
          et.event_id, et.team_id, p1.player_firstname, p1.player_lastname, p2.player_firstname, p2.player_lastname;
    `;

    const result = await pool.query(query, [eventId]);

    /*     // Update team_bonusPoints for teams that have played all matches
    const teamsToUpdate = result.rows.filter(
      (team) => team.played_matches === team.total_matches
    );
    for (const team of teamsToUpdate) {
      await pool.query(
        "UPDATE event_teams SET team_bonusPoints = team_bonuspoints + 1 WHERE event_id = $1 AND team_id = $2",
        [eventId, team.team_id]
      );
    } */

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

//WITHDRAW TEAM FROM EVENT - RESET TEAM SETS
app.put("/events/:id/teams/:tid", async (req, res) => {
  const { id, tid } = req.params;

  try {
    // Update matches for withdrawn team
    await pool.query(
      "UPDATE matches m " +
        "SET team1_sets = 0, team2_sets = 0, withdrawal = true " +
        "FROM event_teams et " +
        "WHERE m.event_id = et.event_id " +
        "AND (m.team1_id = et.team_id OR m.team2_id = et.team_id) " +
        "AND et.team_id = $1",
      [tid]
    );

    // Update event_teams table to mark team as withdrawn
    await pool.query(
      "UPDATE event_teams " +
        "SET team_withdrawn = true " +
        "WHERE event_id = $1 AND team_id = $2",
      [id, tid]
    );

    res.json({ message: "Team withdrawn from event" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET ALL MATCHES
app.get("/matches", async (req, res) => {
  try {
    const matches = await pool.query("SELECT * FROM matches");
    res.json(matches.rows);
  } catch (error) {
    console.error(error);
  }
});

// GET MATCHES FROM EVENT
app.get("/events/:id/matches", async (req, res) => {
  const event_id = req.params.id;

  try {
    const query = `
      SELECT
          m.*,
          t1.player1_id AS team1_player1_id,
          p1.player_firstname AS team1_player1_firstname,
          p1.player_lastname AS team1_player1_lastname,
          t1.player2_id AS team1_player2_id,
          p2.player_firstname AS team1_player2_firstname,
          p2.player_lastname AS team1_player2_lastname,
          t2.player1_id AS team2_player1_id,
          p3.player_firstname AS team2_player1_firstname,
          p3.player_lastname AS team2_player1_lastname,
          t2.player2_id AS team2_player2_id,
          p4.player_firstname AS team2_player2_firstname,
          p4.player_lastname AS team2_player2_lastname
      FROM
          matches m
      JOIN
          teams t1 ON m.team1_id = t1.team_id
      JOIN
          teams t2 ON m.team2_id = t2.team_id
      JOIN
          players p1 ON t1.player1_id = p1.player_id
      JOIN
          players p2 ON t1.player2_id = p2.player_id
      JOIN
          players p3 ON t2.player1_id = p3.player_id
      JOIN
          players p4 ON t2.player2_id = p4.player_id
      WHERE
          m.event_id = $1;
    `;

    const matches = await pool.query(query, [event_id]);

    res.json(matches.rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving matches." });
  }
});

// CREATE NEW MATCHES BULK ACTION
app.post("/matches", async (req, res) => {
  const matchesData = req.body;

  try {
    const newMatches = await Promise.all(
      matchesData.map(async (match) => {
        const { event_id, team1_id, team2_id } = match;

        // Check if a match with the same teams exists for the event
        const existingMatch = await pool.query(
          "SELECT * FROM matches WHERE event_id = $1 AND ((team1_id = $2 AND team2_id = $3) OR (team1_id = $3 AND team2_id = $2))",
          [event_id, team1_id, team2_id]
        );

        if (existingMatch.rows.length > 0) {
          console.log("Match already exists:", existingMatch.rows[0]);
          return null; // Skip insertion for this match
        }

        const newMatch = await pool.query(
          "INSERT INTO matches(event_id, team1_id, team2_id) VALUES ($1, $2, $3) RETURNING *",
          [event_id, team1_id, team2_id]
        );
        return newMatch.rows[0];
      })
    );

    // Remove null values from the array (matches that were skipped)
    const filteredMatches = newMatches.filter((match) => match !== null);

    res.status(201).json(filteredMatches);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating matches." });
  }
});

//EDIT MATCH SCORES
app.put("/matches/:id", async (req, res) => {
  const { id } = req.params;
  const {
    match_date,
    isfinished,
    winner_id,
    team1_sets,
    team2_sets,
    winner_score,
  } = req.body;

  try {
    // Fetch the midway_point from the leagues table
    const leaguesQuery =
      "SELECT midway_point FROM leagues WHERE id = (SELECT league_id FROM events WHERE event_id = (SELECT event_id FROM matches WHERE match_id = $1))";
    const leaguesResult = await pool.query(leaguesQuery, [id]);
    const midwayPoint = new Date(leaguesResult.rows[0].midway_point);

    const matchUpdate = await pool.query(
      "UPDATE matches SET match_date = $1, isfinished = $2, winner_id = $3, team1_sets = $4, team2_sets = $5, winner_score = $6 WHERE match_id = $7 RETURNING event_id, team1_id, team2_id;",
      [
        match_date,
        isfinished,
        winner_id,
        team1_sets,
        team2_sets,
        winner_score,
        id,
      ]
    );

    // Check if all matches of team1 are finished
    const event_id = matchUpdate.rows[0].event_id;
    const team1_id = matchUpdate.rows[0].team1_id;

    const allMatchesFinishedTeam1Query = `
      SELECT 
        COUNT(*) = COUNT(CASE WHEN isfinished THEN 1 END) AS all_matches_finished_team1
      FROM matches
      WHERE 
        event_id = $1 AND (team1_id = $2 OR team2_id = $2);
    `;

    const allMatchesFinishedTeam1Result = await pool.query(
      allMatchesFinishedTeam1Query,
      [event_id, team1_id]
    );

    if (allMatchesFinishedTeam1Result.rows[0].all_matches_finished_team1) {
      // Update all_bonus to 1 for team1 in event_teams
      await pool.query(
        "UPDATE event_teams SET all_bonus = 1 WHERE event_id = $1 AND team_id = $2;",
        [event_id, team1_id]
      );
    }

    // Check if all matches of team2 are finished
    const team2_id = matchUpdate.rows[0].team2_id;

    const allMatchesFinishedTeam2Query = `
      SELECT 
        COUNT(*) = COUNT(CASE WHEN isfinished THEN 1 END) AS all_matches_finished_team2
      FROM matches
      WHERE 
        event_id = $1 AND (team1_id = $2 OR team2_id = $2);
    `;

    const allMatchesFinishedTeam2Result = await pool.query(
      allMatchesFinishedTeam2Query,
      [event_id, team2_id]
    );

    if (allMatchesFinishedTeam2Result.rows[0].all_matches_finished_team2) {
      // Update all_bonus to 1 for team2 in event_teams
      await pool.query(
        "UPDATE event_teams SET all_bonus = 1 WHERE event_id = $1 AND team_id = $2;",
        [event_id, team2_id]
      );
    }

    // Convert the match_date to a Date object
    const matchDate = new Date(match_date);

    // Check if the match_date is before or equal to the midway_point
    const midwayPointCheckQuery = `
      SELECT 
        CASE WHEN $1 <= $2 THEN true ELSE false END AS before_midway
      FROM matches m
      WHERE m.match_id = $3;
    `;

    const midwayPointCheckResult = await pool.query(midwayPointCheckQuery, [
      matchDate,
      midwayPoint,
      id,
    ]);

    if (midwayPointCheckResult.rows[0].before_midway) {
      // Update byMidpoint to true for the match
      await pool.query(
        "UPDATE matches SET bymidpoint = true WHERE match_id = $1;",
        [id]
      );
    }

    res.json(matchUpdate.rows);
  } catch (error) {
    console.error("EDIT MATCH ERROR:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the match." });
  }
});

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
