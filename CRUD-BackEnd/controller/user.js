const user = require('../model/user');

exports.userProfile = (req, res, next) => {
    user.getProfile(req.params.user, (data) => {
        console.log("controller: " + JSON.stringify(data));

        if (data !== null) {
            res.json(data)
        } else {
            res.status(500).send("There was an error")
        }

    })

}