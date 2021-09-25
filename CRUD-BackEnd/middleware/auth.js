const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.createJWT = async(req, res) => {

    console.log("createJWT triggered..");

    const token = jwt.sign({ id: req.body.id },
        process.env.TOKEN_KEY, {
            expiresIn: "2d",
        }
    );

    // res.status(200).json(token);
    res.status(200).json({ id: req.body.id, token });
}


exports.verify = async(req, res, next) => {

    console.log("Auth validate triggered!");

    const bearerFull = req.headers['authorization'];

    // console.log(bearerFull);

    // this splits the bearer into it's parts

    if (bearerFull) {
        const bearer = bearerFull.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
    } else {
        // No JWT!
        res.status(403);
    }


    // verifying the JWT
    jwt.verify(req.token, process.env.TOKEN_KEY, (err, decoded) => {

        if (err) {
            console.log("jwt Verification failed");
            res.status(403).send();
        }

        if (decoded) {
            // This allows the id to be accessible downstream.
            // Client wont need to attach on request body!
            res.locals.user = decoded.id;
            console.log("decoded success!")
                // console.log(req.params.id)
            next();
        }


    });

}

exports.isOwner = (req, res, next) => {

    // console.log(req.params.user);

    const bearerFull = req.headers['authorization'];

    // console.log(bearerFull);

    if (bearerFull) {
        const bearer = bearerFull.split(' ');
        const bearerToken = bearer[1];
        var decoded = jwt.decode(bearerToken, { complete: true });
        // justToken = bearerToken;
    } else {
        // No JWT!
        res.status(403);
    }

    if (decoded) {
        // Ternary operator allows for use with post route
        if (
            (decoded.payload.id == (req.params.user ? req.params.user : req.body.id)) ||
            (decoded.payload.id == (res.locals.user ? res.locals.user : null))) {

            console.log("Same as user: Successfull!");
            next();

        } else {
            console.log("Access denied.");
            res.status(403).send("Access denied.");
        }
    } else {
        res.status(403).send("Access denied.");
    }


    // next();
}