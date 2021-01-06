const express = require("express");
const {
    registerUser,
    loginUser,
    logoutUser,
    generate2FACode,
    verify2FACode,
} = require("../controllers/authControllers");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/2fa/generate", generate2FACode);
router.post("/2fa/verify", verify2FACode);

module.exports = router;
