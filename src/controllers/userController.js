const userModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getUsers(req, res) {
  const users = await userModel.find();
  res.json({ message: "success", data: users, length: users.length });
}

async function addUser(req, res) {
  const { name, email, password, role } = req.body;
  const newUser = new userModel({ name, email, password, role });
  await newUser.save();
  res.status(201).send({ message: "created", data: newUser });
}

async function getUser(req, res) {
  const { id } = req.params;
  const user = await userModel.findById(id);
  if (user) {
    res.send({ message: "success", data: user });
  } else {
    res.status(404).send({ message: "not found" });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const { name, password } = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(
    id,
    { name, password, updated_at: new Date() },
    { new: true }
  );
  if (updatedUser) {
    res.send({ message: "updated", data: updatedUser });
  } else {
    res.status(404).send({ message: "not found" });
  }
}

async function deleteUser(req, res) {
  const { id } = req.params;
  const deletedUser = await userModel.findByIdAndDelete(id);
  if (deletedUser) {
    res.send({ message: "deleted" });
  } else {
    res.status(404).send({ message: "not found" });
  }
}

async function logIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      "secret_key",
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = { getUsers, addUser, getUser, updateUser, deleteUser, logIn };
