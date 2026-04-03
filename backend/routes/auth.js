const express = require("express");
const router = express.Router();
const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, phone, blood_group } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password, phone, blood_group) VALUES (?, ?, ?, ?, ?)",
    [name, email, hashedPassword, phone, blood_group],
    (err) => {
      if (err) return res.status(500).send(err);
      res.send("✅ User Registered");
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length === 0) return res.status(400).send("User not found");

    const user = results[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) return res.status(400).send("Wrong password");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ token, user });
  });
});

module.exports = router;