// const { Router } = require("express");
const router = require("express").Router();
// same as this,
// const express = require('express');
// const router = express.Router();


const jwt = require("../middleware/auth")

const user = require("../controller/user");



// This .use is scoped to this module only
router.use("/", jwt.verify)

router.get("/:user", jwt.isOwner, user.userProfile);





module.exports = router;