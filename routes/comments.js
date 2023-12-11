const express = require('express');
const router = express.Router();
const { allComments, commentById, addComment, removeComment, editComment} = require("../controllers/comments");
const { auth } = require('../middleware/auth');

router.get("/", allComments);
router.get("/:id", commentById);
router.post("/add", auth, addComment);
router.post("/remove/:id", auth, removeComment);
router.put("/edit/:id", auth, editComment);

module.exports = router;
