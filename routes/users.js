const express = require('express');
const router = express.Router();
const {allUser, getUser, login, register, current} = require("../controllers/users");
const {auth} = require('../middleware/auth');

router.get("/all", allUser);
router.get("/profile/:username", getUser);
router.post("/login", login);
router.post("/register", register);
router.get("/current", auth, current);

module.exports = router;