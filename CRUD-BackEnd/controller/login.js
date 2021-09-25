// bcrypting of passwords.
//notes as per docs, hashed passwords are 60 characters long.
const bcrypt = require('bcrypt');

const user = require("../model/login");

exports.alreadyUser = (req, res, next) => {

    user.alreadyUser(req.body.id, (err, data) => {
        if (data == req.body.id) {
            // res.send('User already exist!');
            res.status(409).send("Already a user!");
        } else {
            console.log("Not a user yet..")
            next();
        }

    });

}

exports.signup = async(req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        user.addUser(req.body.id, hashedPassword, (err, data) => {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.status(201).send("Signup Successfull, Welcome! " + (data ? data : ""));
            }
        })
    } catch {
        console.log("Password hashing failure")
        res.status(500).send("Authentication Failure.")
    }
}


exports.login = async(req, res, next) => {

    user.login(req.body.id, async(err, data) => {

        if (err) {
            console.log(err);
            res.status(500).send("There was an error: " + err);
            // End of call.
        }
        if (data == null) {
            console.log(data);
            res.status(500).send("There was a differen't error: ");
        }


        console.log(data);

        if (data.id == req.body.id) {

            console.log("Username match..");

            const validPassword = await bcrypt.compare(req.body.password, data.password);

            if (validPassword) {
                // res.status(200).json({ message: "Valid password" });
                console.log("login validation successfull");
                next();
            } else {
                res.status(401).json({ error: "Invalid Password" });
            }
        }
    })
}