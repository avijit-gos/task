/** @format */

const {
  createUser,
  loginUser,
} = require("../../controller/userController/userController");
const { auth } = require("../../middleware/auth");

const router = require("express").Router();

// 1. Register user route
router.post("/register", createUser);

// 2. Login  user route
router.post("/login", loginUser);

module.exports = router;
