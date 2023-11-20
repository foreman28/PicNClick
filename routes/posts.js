const express = require('express');
const router = express.Router();
const { add, edit, remove, all, post} = require("../controllers/posts");
const { auth } = require('../middleware/auth');

router.get("/", all);
router.get("/:url", post);
router.post("/add", auth, add);
router.post("/remove/:id", auth, remove);
router.put("/edit/:id", auth, edit);

module.exports = router;
