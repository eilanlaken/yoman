const express = require("express");
const { login, signup, verify } = require("../controllers/authController");

const router = express.Router();

// login
router.post("/login", login);

// sign up
router.post("/signup", signup);

// verify
router.post("/verify-email", verify);

// forgot password

module.exports = router;
