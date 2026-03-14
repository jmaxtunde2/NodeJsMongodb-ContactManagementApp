const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUserProfile } = require('../controller/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateTokenHandler, getCurrentUserProfile);

module.exports = router;