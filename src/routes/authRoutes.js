const express = require("express");
const { register, login, helloWorld, googleAuth, googleAuthTest } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleAuth);
router.get("/test", helloWorld);
router.get("/testGoogle", googleAuthTest);

module.exports = router;
