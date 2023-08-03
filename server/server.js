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
      `INSERT INTO leagues(league_name, starting_date, midway_point, end_date) VALUES ($1, $2, $3, $4)`,
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

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`));
