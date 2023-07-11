const User = require("../models/User");
const SignUpAttempt = require("../models/SignUpAttempt");
const mongoose = require("mongoose");
const validator = require("validator");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
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

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const error = await validateSignUpFields({
    email,
    password,
    firstName,
    lastName,
  });
  if (error) return res.status(error.code).json({ error: error.msg });
  // sign up fields are valid

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const token = crypto.randomBytes(32).toString("hex");
  const expires = new Date();
  expires.setHours(
    expires.getHours() +
      Number(process.env.REGISTRATION_TOKEN_EXPIRATION_TIME_HOURS)
  );

  await SignUpAttempt.create({
    email,
    password: hash,
    firstName,
    lastName,
    token,
    expires,
  });

  res.status(200).json({
    msg: `Successful signup`,
  });
};

const validateSignUpFields = async ({
  email,
  password,
  firstName,
  lastName,
}) => {
  // validate first name
  if (!firstName) return { code: 400, msg: "First name cannot be blank." };
  if (firstName.length > 50)
    return { code: 400, msg: "First name cannot exceed 50 letters" };
  if (!/^[a-zA-Z]+$/.test(firstName)) {
    return { code: 400, msg: "First name can only contain letters" };
  }
  // validate last name
  if (!lastName) return { code: 400, msg: "Last name cannot be blank." };
  if (lastName.length > 50)
    return { code: 400, msg: "Last name cannot exceed 50 letters" };
  if (!/^[a-zA-Z]+$/.test(lastName)) {
    return { code: 400, msg: "Last name can only contain letters" };
  }
  // validate password
  if (!password) return { code: 400, msg: "Password cannot be blank." };
  if (!schema.validate(password))
    return {
      code: 400,
      msg: "Password must contain: at least 1 uppercase, at least 1 lowercase, at least 1 symbol, at least 1 digit and be between 8 and 26 characters long.",
    };
  // validate email
  if (!email) return { code: 400, msg: "Email cannot be blank." };
  if (!validator.isEmail(email))
    return { code: 400, msg: "Not a valid email address" };
  const alreadyRegistered = await User.findOne({ email });
  if (alreadyRegistered) return { code: 409, msg: "Email already registered" };
};

const verify = async (req, res) => {
  const { token } = req.query;
  const signUpAttempt = await SignUpAttempt.findOne({ token });
  if (!signUpAttempt) {
    return res.status(404).json({
      error: `Not found.`,
    });
  }
  const { firstName, lastName, email, password } = signUpAttempt;
  const alreadyRegistered = await User.findOne({ email });
  if (alreadyRegistered) {
    await SignUpAttempt.findOneAndDelete({ token });
    return res.status(409).json({
      error: `Email already registered.`,
    });
  }

  await User.create({
    email,
    password,
    firstName,
    lastName,
    role: "CUSTOMER",
    gold: false,
  });

  await SignUpAttempt.findOneAndDelete({ token });

  res.status(200).json({
    msg: `Your email address has been verified. You may now login.`,
  });
};

// login user
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ error: "Email cannot be blank" });
  if (!password)
    return res.status(400).json({ error: "Password cannot be blank" });
  const user = await User.findOne({ email });
  if (!user) {
    const signUpAttempt = await SignUpAttempt.findOne({ email });
    if (signUpAttempt) {
      return res.status(401).json({
        error:
          "Unauthorized: please verify your email by clicking on the link we sent before logging in.",
      });
    } else {
      return res
        .status(404)
        .json({ error: `User with email ${email} not found.` });
    }
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  // generate JWT and send success response:
  const jwt = createToken(user.email);
  res.status(200).json({
    msg: "login successful",
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    jwt,
    role: user.role,
    gold: user.gold,
  });
};

module.exports = {
  login,
  signup,
  verify,
};
