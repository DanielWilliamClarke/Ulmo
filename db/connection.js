const mysql = require("mysql");

module.exports = mysql.createPool({
  connectionLimit : 10,
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "root",
  database: "qg"
});