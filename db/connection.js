const mysql = require("mysql");

module.exports = mysql.createPool({
  connectionLimit : 10,
  multipleStatements: true,
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "qg"
});