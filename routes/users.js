const express = require('express');
const router = express.Router();
const {user, login, register, current} = require("../controllers/users");
const {auth} = require('../middleware/auth');

router.get("/profile/:username", user);
router.post("/login", login);
router.post("/register", register);
router.get("/current", auth, current);

module.exports = router;