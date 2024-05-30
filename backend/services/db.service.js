const mysql = require("mysql");

const pool = mysql.createPool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT,
});

// const pool = mysql.createPool({
//   user: "root",
//   password: "",
//   connectionLimit: 5,
//   database: "flight_app",
//   host: "localhost",
// });

module.exports = pool;
