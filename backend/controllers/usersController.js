const User = require("../models/User");
const mongoose = require("mongoose");

// get all users (modify to include pagination)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json({ msg: users });
  } catch (error) {
    res.status(500).json({ msg: `Internal server error ${error}` });
  }
};

// get a single user (by handle)
const getUserByHandle = async (req, res) => {
  const { handle } = req.params;
  const user = await User.findOne({ handle });
  if (!user) {
    return res
      .status(404)
      .json({ msg: `User with handle ${handle} Not found` });
  }

  res.status(200).json(user);
};

// get a single user by id
const getUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// register a new user
const registerUser = async (req, res) => {
  const { firstName, lastName, email, handle, title } = req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      handle,
      title,
    });
    res.status(200).json({ msg: user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete a user
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  const user = await User.findOneAndDelete({ _id: id });
  if (!user) {
    return res.status(404).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

// update user's info
const updateUserInfo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!user) {
    return res.status(400).json({ error: "No such user" });
  }

  res.status(200).json(user);
};

module.exports = {
  registerUser,
  getAllUsers,
  getUserByHandle,
  getUserById,
  deleteUserById,
  updateUserInfo,
};
