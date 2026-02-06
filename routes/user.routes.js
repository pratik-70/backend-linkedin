// express
const express = require("express");
const {signup, signin} = require("../controllers/user.contollers")
// router
const router = express.Router();

//endpoints
// HTTP
/*
GET - retrieval of data
POST - creating new document
PUT/PATCH - updating documents
DELETE - delete document
*/
router.post("/register", signup)
router.post("/login", signin)


module.exports = router