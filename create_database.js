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

function GenerateUsers(total) {

  usersArray = [];
  for (let index = 1; index <= total; index++) {
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

function GenerateProducts(total) {

  productsArray = [];
  for (let index = 1; index <= total; index++) {
    productsArray.push([
      index,
      "Quit Genius Product" + index,
      index * 10
    ]);
  }

  con.query("INSERT INTO product (productId, productName, productPrice) VALUES ?", [productsArray], function (err, result) {
    if (err) throw err;
    console.log("Products created");
  });
}

function GenerateSalaries(total) {
  salaryArray = [];
  for (let index = 1; index <= total; index++) {
    salaryArray.push([
      index,
      index * 10
    ]);
  }
  con.query("INSERT INTO salary (userId, amount) VALUES ?", [salaryArray], function (err, result) {
    if (err) throw err;
    console.log("Salaries created");
  });
}

function GetRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

function GenerateTransactions(totalUsers, maxTransactionsPerUser, totalProducts) {
  let transactions = [];
  let transactionId = 1;
  for (let index = 1; index <= totalUsers; index++) {
    let userTransactions = [];
    for (let jndex = 1; jndex <= GetRandomInt(maxTransactionsPerUser); jndex++) {
      userTransactions.push([
        ++transactionId,
        index,
        GetRandomInt(totalProducts),
      ]);
    }
    transactions.push(userTransactions);
  }

  var flatTransactions = transactions.reduce(function (array, userTransactions) {
    return array.concat(userTransactions);
  }, []);

  con.query("INSERT INTO transaction (transactionId, userId, productId) VALUES ?", [flatTransactions], function (err, result) {
    if (err) throw err;
    console.log("Transaction created");
  });
}

con.connect(function 
  (err) {
  if (err) throw err;
  console.log("Connected!");

  CreateTable("tables/user.sql");
  GenerateUsers(100);

  CreateTable("tables/salary.sql");
  GenerateSalaries(100);

  CreateTable("tables/product.sql");
  GenerateProducts(20);

  CreateTable("tables/transaction.sql");
  GenerateTransactions(100, 5, 20);

  CreateTable("tables/discount.sql");



});
