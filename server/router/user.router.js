const express = require("express");
const { auth } = require("../middleware/auth.middleware");
const {
  register,
  login,
  getProfile,
  updateProfile,
  getUserById,
} = require("../controller/user.controller");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.get("/:id", getUserById);

// Protected routes
router.get("/profile/me", auth, getProfile);
router.put("/profile/update", auth, updateProfile);

module.exports = router;
