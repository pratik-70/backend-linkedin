const express = require("express");
const router = express.Router();
const { CreateProfile } = require("../controllers/profile.controller");

router.post("/create-profile", CreateProfile);

module.exports = router;