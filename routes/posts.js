const express = require('express');
const router = express.Router();
const { add, edit, remove, all, post, search} = require("../controllers/posts");

const { auth } = require('../middleware/auth');
const upload = require('../middleware/upload')

router.get("/", all);
router.get("/:url", post);
router.post("/add", auth, upload.single('image'), add);
router.put("/edit/:id", auth, upload.single('image'), edit);
router.post("/remove/:id", auth, remove);

module.exports = router;
