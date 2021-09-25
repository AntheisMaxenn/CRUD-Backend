const sql = require("./db");

exports.getProfile = (id, result) => {
    sql.query(`SELECT * FROM ClientInfo Where id = '${id}'`, (err, res, fields) => {
        if (err) {
            console.log("There was an unexpected error: ", err);
            result(err);
            // return;
        }
        if (res.length) {
            console.log(res[0])
            result({
                    id: res[0].id,
                    firstName: res[0].firstName,
                    lastName: res[0].lastName
                })
                // console.log(fields)
                // result(null, res[0].id);
        } else {
            result('null');
        }
    });
}