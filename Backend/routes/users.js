const express = require("express");
const router = express.Router();

const User = require("../models/users");
const {
  getUsers,
  getUserById,
  postUser,
  updateUser,
  updateAvatar,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/:userId", getUserById);
router.post("/", postUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);
module.exports = router;
