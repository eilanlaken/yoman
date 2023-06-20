const express = require("express");
const {
  getAllUsers,
  getUserById,
  getUserByHandle,
  registerUser,
  deleteUserById,
  updateUserInfo,
} = require("../controllers/usersController");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/:id", getUserById);

//router.get('/:handle', getUserByHandle)

router.post("/", registerUser);

router.delete("/:id", deleteUserById);

router.patch("/:id", updateUserInfo);

module.exports = router;
