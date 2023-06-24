const User = require("../models/User");
const SignUpAttempt = require("../models/SignUpAttempt");
const mongoose = require("mongoose");
const validator = require("validator");
const passwordValidator = require("password-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const source = fs.readFileSync(
  path.join(__dirname, "../templates/verifyEmail.html"),
  "utf8"
);
const verifyEmailAddressEmailTemplate = handlebars.compile(source);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_PASSWORD,
  },
});

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

const attemptSignUp = async (req, res) => {
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

  const signUpAttempt = await SignUpAttempt.create({
    email,
    password: hash,
    firstName,
    lastName,
    token,
    expires,
  });

  // send email
  // const mail = {
  //   from: process.env.MAILER_EMAIL,
  //   to: email,
  //   subject: "Devcard Email Verification",
  //   html: verifyEmailAddressEmailTemplate({
  //     firstName,
  //     lastName,
  //     link: token,
  //   }),
  // };

  const mail = {
    from: "devcard.donotreply@gmail.com",
    to: "eilanlaken@gmail.com",
    subject: "king gigacel",
    text: "hi",
  };

  let mailError = undefined;
  transporter.sendMail(mail, (err, info) => {
    if (err) mailError = err;
  });
  if (mailError)
    return res.status(500).json({ msg: `Internal server error: ${mailError}` });

  res.status(200).json({ msg: `User registered` });
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
        "Password must contain: at least 1 uppercase, at least 1 lowercase, at least 1 symbol, at least 1 digit and be between 8 and 26 characters long.",
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
  signup, // depracated
  attemptSignUp,
};
