const mysql = require("mysql");
const fs = require("fs");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "qg"
});

function CreateTable(sqlFile) {
  var sql = fs.readFileSync(sqlFile).toString();
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
}

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  CreateTable("tables/user.sql");
  CreateTable("tables/product.sql");
  CreateTable("tables/transaction.sql");
  CreateTable("tables/salary.sql");
  CreateTable("tables/discount.sql");
});