const User = require("../models/User");
const mongoose = require("mongoose");
const validator = require("validator");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (email) => {
  return jwt.sign({ email }, process.env.SECRET);
};

const schema = new passwordValidator();
schema
  .is()
  .min(8)
  .is()
  .max(26)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1)
  .has()
  .not()
  .spaces()
  .has()
  .symbols(1);

// sign up user
const signup = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: "Email cannot be blank" });
  if (!password)
    return res.status(400).json({ error: "Password cannot be blank" });
  // validate legal email expression
  const isValidEmail = validator.isEmail(email);
  if (!isValidEmail) {
    return res.status(400).json({ error: "Must use a valid email address" });
  }

  // verify email doesn't already exist in the db
  const exists = await User.findOne({ email });
  if (exists) {
    return res
      .status(409)
      .json({ error: "Email already registered. Forgot password?" });
  }

  // validate strong password
  if (!schema.validate(password)) {
    return res.status(400).json({
      error:
        "Password must contain: at least 1 uppercase, at least 1 lowercase, at least 1 symbol, at least 1 digit and be between 8 and 26 characters long. ",
    });
  }
  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hash,
    handle: email, // temporary handle
  });

  res.status(200).json({ msg: `User registered` });
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: "Email cannot be blank" });
  if (!password)
    return res.status(400).json({ error: "Password cannot be blank" });
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "Incorrect email or password" });
  }

  // generate JWT and send success response:
  const jwt = createToken(user.email);
  res.status(200).json({ msg: "login successful", jwt, email });
};

module.exports = {
  login,
  signup,
};
