const express = require("express");
const router = express.Router();
router.use(express.json());

const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//ADMIN LOGIN
router.post("/login", async (req, res) => {
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
router.post("/signup", async (req, res) => {
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

module.export = router;
