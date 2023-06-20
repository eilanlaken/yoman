const Developer = require("../models/Developer");
const mongoose = require("mongoose");

// get all developers (modify to include pagination)
const getAllDevelopers = async (req, res) => {
  try {
    const developers = await Developer.find({}).sort({ createdAt: -1 });
    res.status(200).json({ msg: developers });
  } catch (error) {
    res.status(500).json({ msg: `Internal server error ${error}` });
  }
};

// get a single developer (by handle)
const getDeveloperByHandle = async (req, res) => {
  const { handle } = req.params;
  const developer = await Developer.findOne({ handle });
  if (!developer) {
    return res
      .status(404)
      .json({ msg: `Developer with handle ${handle} Not found` });
  }

  res.status(200).json(developer);
};

// get a single developer by id
const getDeveloperById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such developer" });
  }
  const developer = await Developer.findById(id);
  if (!developer) {
    return res.status(404).json({ error: "No such developer" });
  }

  res.status(200).json(developer);
};

// register a new developer
const registerDeveloper = async (req, res) => {
  const { firstName, lastName, email, handle, title } = req.body;

  try {
    const developer = await Developer.create({
      firstName,
      lastName,
      email,
      handle,
      title,
    });
    res.status(200).json({ msg: developer });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete a developer
const deleteDeveloperById = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such developer" });
  }
  const developer = await Developer.findOneAndDelete({ _id: id });
  if (!developer) {
    return res.status(404).json({ error: "No such developer" });
  }

  res.status(200).json(developer);
};

// update developer's info
const updateDeveloperInfo = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such developer" });
  }
  const developer = await Developer.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!developer) {
    return res.status(400).json({ error: "No such developer" });
  }

  res.status(200).json(developer);
};

module.exports = {
  registerDeveloper,
  getAllDevelopers,
  getDeveloperByHandle,
  getDeveloperById,
  deleteDeveloperById,
  updateDeveloperInfo,
};
