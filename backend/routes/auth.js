const express = require("express");
const {
  login,
  signup,
  attemptSignUp,
} = require("../controllers/authController");

const router = express.Router();

// login
router.post("/login", login);

// sign up
router.post("/signup_old", signup);
router.post("/signup", attemptSignUp);

// verify

// forgot password

module.exports = router;
