// login route
const router = require("express").Router();
const { Router } = require("express");
// same as this,
// const express = require('express');
// const router = express.Router();

const login = require("../controller/login");
const jwt = require("../middleware/auth")



// .use in module don't bleed out of scope
// router.use( *middleware* );

// route that goes to the users







router.post("/signup", login.alreadyUser, login.signup);


router.post("/login", login.login, jwt.createJWT);


// Route that requires autheticated JWT
// jwt.verify

router.get("/home", jwt.verify, (req, res) => {
    res.json(`The home route!`)
});

// router.get("/:user", jwt.isOwner, (req, res) => {
//     console.log("User param route comepete:")
// });


// Wildcard route, 404.
router.get("/*", (req, res) => {
    res.status(404).send("Route missing.");
})

module.exports = router;