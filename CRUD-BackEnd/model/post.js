const sql = require("./db");

exports.newPost = (req, res, result) => {
    sql.query(`insert into Post (id, postID, content, public) VALUES ("${req.body.id}", DEFAULT, "${req.body.content}", ${req.body.public});`, (err, res, fields) => {
        if (err) {
            console.log("There was an unexpected error: ", err);
            result(err);
        } else {
            result('Success');
        }
    });
}

// TODO Pagination support req.body.id -> req.params.id ?
exports.userPosts = (req, res, result) => {
    sql.query(`SELECT * FROM Post WHERE id = "${res.locals.user}"`, (err, res, fields) => {
        if (err) {
            console.log("There was an unexpected error: ", err);
            result(err, null);
        } else {
            console.log(res)
                // console.log(fields)
            result(null, res);
        }
    });
}


exports.publicPosts = (req, res, result) => {
    sql.query(`SELECT * FROM Post WHERE public = "1" ORDER BY postID DESC;`, (err, res, fields) => {
        if (err) {
            console.log("There was an unexpected error: ", err);
            result(err, null);
        } else {
            console.log(res)
                // console.log(fields)
            result(null, res);
        }
    });
}

exports.deletePost = (req, res, result) => {
    sql.query(`DELETE FROM Post WHERE id = "${req.body.id}" AND postID =${req.body.postID}`, (err, res, fields) => {
        if (err) {
            console.log("There was an unexpected error: ", err);
            result(err, null);
        } else {
            // console.log(res)
            // console.log(fields)
            result(null, res);
        }
    });
}