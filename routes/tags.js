const express = require('express');
const router = express.Router();
const { allTags, tagById, addTag, removeTag, editTag} = require("../controllers/tags");
const { auth } = require('../middleware/auth');

router.get("/", allTags);
router.get("/:url", tagById);
router.post("/add", auth, addTag);
router.post("/remove/:id", auth, removeTag);
router.put("/edit/:id", auth, editTag); // Uncomment this line

module.exports = router;
