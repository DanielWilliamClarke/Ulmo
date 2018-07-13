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

function GenerateUsers (total) {

  usersArray = [];
  for(let index = 1; index <= total; index++) {
    usersArray.push([
      index,
      "Quit Genius User" + index,
      `user${index}@quitgenius.com`
    ]);
  }
  
  con.query("INSERT INTO user (userId, userName, userEmail) VALUES ?", [usersArray], function (err, result) {
    if (err) throw err;
    console.log("Users created");
  });
}

function GenerateProducts (total) {

  productsArray = [];
  for(let index = 1; index <= total; index++) {
    productsArray.push([
      index,
      "Quit Genius Product" + index,
      index * 10
    ]);
  }
  
  con.query("INSERT INTO product (productId, productName, productPrice) VALUES ?", [productsArray], function (err, result) {
    if (err) throw err;
    console.log("Users created");
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


  /* CREATE USERS */
  //GenerateUsers(100);
  GenerateProducts(100);



});

