/** @format */

const {
  fetchAllUser,
  fetchSingleUser,
  updateUser,
  deleteUser,
} = require("../../controller/userController/userController");

const router = require("express").Router();

// 1. Get all user
router.get("/", fetchAllUser);

// 2. Fetch single user
router.get("/single/:id", fetchSingleUser);

// 3. Update user details
router.put("/update/user", updateUser);

// 4. Delete user
router.delete("/delete/user", deleteUser);

module.exports = router;
