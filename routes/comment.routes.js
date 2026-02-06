const express = require("express");
const router = express.Router();
const { CreateComment } = require("../controllers/comment.controller");

router.post("/create-comment", CreateComment);

module.exports = router;