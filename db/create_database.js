const mysql = require("mysql");
const fs = require("fs");

const GenerateUserData = require("./data/user_data.js");
const GenerateProductData = require("./data/product_data.js");
const GenerateSalaryData = require("./data/salary_data.js");
const GenerateTransactionData = require("./data/transaction_data.js");
const GenerateDiscountData = require("./data/discount_data.js");

var con = mysql.createConnection({
  host: "localhost",
  port: 3307,
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

function GenerateSalaries(total, maxPayments) {
  con.query("INSERT INTO salary (userId, amount) VALUES ?", [GenerateSalaryData(total, maxPayments)], function (err, result) {
    if (err) throw err;
    console.log("Salaries created");
  });
}

function GenerateProducts(total) {
  con.query("INSERT INTO product (productId, productName, productPrice) VALUES ?", [GenerateProductData(total)], function (err, result) {
    if (err) throw err;
    console.log("Products created");
  });
}

function GenerateTransactions(totalUsers, maxTransactionsPerUser, totalProducts) {
  con.query("INSERT INTO transaction (transactionId, userId, productId) VALUES ?", 
  [GenerateTransactionData(totalUsers, maxTransactionsPerUser, totalProducts)], function (err, result) {
    if (err) throw err;
    console.log("Transaction created");
  });
}

function GenerateDiscounts(totalUsersDiscounted, totalUsers, totalProducts) {
  con.query("INSERT INTO discount (userId, productId, percentage) VALUES ?",
   [GenerateDiscountData(totalUsersDiscounted, totalUsers, totalProducts)], function (err, result) {
    if (err) throw err;
    console.log("Discounts created");
  });
}

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  const totalUsers = 1000;
  const totalProducts = 200;
  const maximumTransactionsPerUser = 50;
  const totalDiscountedUser = 400;

  CreateTable("db/tables/user.sql");
  GenerateUsers(totalUsers);

  CreateTable("db/tables/product.sql");
  GenerateProducts(totalProducts);

  CreateTable("db/tables/salary.sql");
  GenerateSalaries(totalUsers, maximumTransactionsPerUser);

  CreateTable("db/tables/transaction.sql");
  GenerateTransactions(totalUsers, maximumTransactionsPerUser, totalProducts);

  CreateTable("db/tables/discount.sql");
  GenerateDiscounts(totalDiscountedUser, totalUsers, totalProducts);
});
