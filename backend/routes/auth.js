const express = require("express");
const { login, signup } = require("../controllers/authController");

const router = express.Router();

// login
router.post("/login", login);

// sign up
router.post("/signup", signup);

// verify

// forgot password

module.exports = router;
