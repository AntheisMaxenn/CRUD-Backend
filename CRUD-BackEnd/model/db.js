// Database will be implicity connected to by invoking .query on the exported "connection";
// This will avoid connection timeout and wont crash the node server.

const mysql = require("mysql");

require("dotenv").config();

const connection = mysql.createPool({
    connectionLimit: 2,
    // For local development only V
    // host: process.env.HOST,
    // For Production V
    host: `/cloudsql/${process.env.DB_INSTANCE}`,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    // For Production V
    socketPath: `/cloudsql/${process.env.DB_INSTANCE}`,
})

module.exports = connection;