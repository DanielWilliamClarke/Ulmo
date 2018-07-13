const mysql = require("mysql");
const fs = require("fs");

const GenerateUserData = require("./db/data/user_data.js");
const GenerateProductData = require("./db/data/product_data.js");
const GenerateSalaryData = require("./db/data/salary_data.js");
const GenerateTransactionData = require("./db/data/transaction_data.js");
const GenerateDiscountData = require("./db/data/discount_data.js");

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
  con.query("INSERT INTO user (userId, userName, userEmail) VALUES ?", [GenerateUserData(total)], function (err, result) {
    if (err) throw err;
    console.log("Users created");
  });
}

function GenerateProducts(total) {
  con.query("INSERT INTO product (productId, productName, productPrice) VALUES ?", [GenerateProductData(total)], function (err, result) {
    if (err) throw err;
    console.log("Products created");
  });
}

function GenerateSalaries(total) {
  con.query("INSERT INTO salary (userId, amount) VALUES ?", [GenerateSalaryData(total)], function (err, result) {
    if (err) throw err;
    console.log("Salaries created");
  });
}


function GenerateTransactions(totalUsers, maxTransactionsPerUser, totalProducts) {
  con.query("INSERT INTO transaction (transactionId, userId, productId) VALUES ?", [GenerateTransactionData(totalUsers, maxTransactionsPerUser, totalProducts)], function (err, result) {
    if (err) throw err;
    console.log("Transaction created");
  });
}

function GenerateDiscounts(totalUsersDiscounted, totalUsers, totalProducts) {
  con.query("INSERT INTO discount (userId, productId, percentage) VALUES ?", [GenerateDiscountData(totalUsersDiscounted, totalUsers, totalProducts)], function (err, result) {
    if (err) throw err;
    console.log("Discounts created");
  });
}

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  const totalUsers = 100;
  const totalProducts = 20;
  const maximumTransactionsPerUser = 5;
  const totalDiscountedUser = 40;

  CreateTable("db/tables/user.sql");
  GenerateUsers(totalUsers);

  CreateTable("db/tables/salary.sql");
  GenerateSalaries(totalUsers);

  CreateTable("db/tables/product.sql");
  GenerateProducts(totalProducts);

  CreateTable("db/tables/transaction.sql");
  GenerateTransactions(totalUsers, maximumTransactionsPerUser, totalProducts);

  CreateTable("db/tables/discount.sql");
  GenerateDiscounts(totalDiscountedUser, totalUsers, totalProducts);
});
