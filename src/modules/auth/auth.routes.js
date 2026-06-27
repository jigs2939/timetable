const express = require("express");
const router = express.Router();

const authController = require("./auth.controller");
const { protect } = require("./auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh", authController.refreshToken);
router.get("/me", protect, authController.getProfile);

module.exports = router;
