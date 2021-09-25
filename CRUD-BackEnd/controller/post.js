const user = require('../model/post');

exports.newPost = (req, res, next) => {
    user.newPost(req, res, (result) => {

        console.log("controller: post.js triggered");

        if (result == "success") {
            console.log(result)
            res.json(result)
        } else {
            console.log(result)
            res.json(result)
                // res.status(500).send("There was an error")
        }

    })
}


// get user posts

exports.userPosts = (req, res, next) => {
    user.userPosts(req, res, (error, data) => {

        console.log("controller: post.js triggered");

        if (error) {
            console.log(error)
            res.json(error)
        }
        if (data) {
            res.json(data)
                // res.status(500).send("There was an error")
        }

    })
}

// get all public post
exports.publicPosts = (req, res, next) => {
    user.publicPosts(req, res, (error, data) => {

        console.log("controller: post.js triggered");

        if (error) {
            console.log(error)
            res.json(error)
        }
        if (data) {
            res.json(data)
                // res.status(500).send("There was an error")
        }

    })
}

// delete post

exports.deletePost = (req, res, next) => {
    user.deletePost(req, res, (error, data) => {

        console.log("controller: post.js triggered");

        if (error) {
            console.log(error)
            res.json(error)
        }
        if (data) {
            if (data.affectedRows >= 1) {
                res.status(200).json(data.affectedRows)
            } else {
                res.status(404).send("Post not found");
            }
            // res.status(500).send("There was an error")
        }

    })
}