const express = require("express");
const { loginUser, signupUser } = require("../controllers/authController");

const router = express.Router();

// login
router.post("/login", loginUser);

// sign up
router.post("/signup", signupUser);

// verify

// forgot password

module.exports = router;
