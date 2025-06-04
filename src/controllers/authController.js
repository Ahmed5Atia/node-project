const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Registeration = async (req, res) => {
  const { username, password, firstName, lastName, email } = req.body;

  if (!username || !password || password.length < 6 || !firstName || !lastName) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ error: "Username already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashed, firstName, lastName, email });

  res.status(201).json({ message: "User registered" });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ error: "Invalid credentials" });

const token = jwt.sign(
  { id: user._id, username: user.username, role: user.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
  res.json({ message: "Login successful", token });
};

module.exports = { Registeration, login };