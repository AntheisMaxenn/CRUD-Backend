const sql = require("./db");

exports.alreadyUser = (id, result) => {

    sql.query(`SELECT id FROM Client Where id = '${id}'`, (err, res, fields) => {
        if (err) {
            console.log("There was an unexpected error: ", err);
            result(err, null);
            // return;
        }
        if (res.length) {
            result(null, res[0].id);
        } else {
            result('null', 'null');
        }
    });
};


exports.addUser = (id, pw, result) => {
    sql.query(`INSERT INTO Client(id, password) VALUES ('${id}', '${pw}')`, (err, res, fields) => {
        if (err) {
            console.log("There was an unexpected error: ", err);
            result(err, null);
            return;
        }
        console.log(res[0]);
        result(null, null);
    });
}


exports.login = (id, result) => {
    sql.query(`SELECT id, password FROM Client Where id = "${id}"`, (err, res, fields) => {

        if (err) {
            console.log("There was an error.." + err)
            result(err, null);
        }

        if (res.length) {
            // console.log(res[0].id);
            result(null, res[0]);
        }

    })
};