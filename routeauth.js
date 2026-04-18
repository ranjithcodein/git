const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../database");

const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedpassword= await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed],
    (err, result) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "User registered successfully" });
    }
  );
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?", 
    [email],
     async (err, result) => {
    if (result.length === 0)
      return res.status(400).json({ message: "User not found" });

    const valid = await bcrypt.compare(
      password, 
      result[0].password
    );

    if (!valid) 
      return res.status(400).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: result[0].id },
      process.env.JWT_SECRET
    );
    res.json({ message:"Login Successful",token});
  });
});

module.exports = router;