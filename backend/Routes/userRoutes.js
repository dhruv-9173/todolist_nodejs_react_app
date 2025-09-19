const express = require("express");
const router = express.Router();
const {
  handleLogin,
  handleRegister,
} = require("../Controllers/userController");
router.post("/login", async (req, res) => await handleLogin(req, res));
router.post("/register", handleRegister);

module.exports = router;
