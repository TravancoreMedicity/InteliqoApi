const { createPool } = require("mysql");


const zkpool = createPool({
    port: process.env.ZK_PORT,
    host: process.env.ZK_HOST,
    user: process.env.ZK_DB_USER,
    password: process.env.ZK_DB_PASS,
    database: process.env.ZK_SQL,
    connectionLimit: 10,
    dateStrings: true
});


module.exports = zkpool;