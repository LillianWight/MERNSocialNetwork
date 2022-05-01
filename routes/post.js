const express = require("express");
const postController = require("../controllers/post");
const router = express.Router();
const validator = require("../validators");

router.get("/", postController.getPosts);
router.post("/post", validator.createPostValidator, postController.createPost);

module.exports = router;
