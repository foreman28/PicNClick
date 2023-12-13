const express = require('express');
const router = express.Router();
const { add, edit, remove, all, post, search} = require("../controllers/posts");

const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload')

router.post("/", all);
router.get("/:url", post);
router.post("/add", auth, upload.single('image'), add);
router.put("/edit/:id", auth, upload.single('image'), edit);
router.delete("/remove/:id", auth, remove);

module.exports = router;
