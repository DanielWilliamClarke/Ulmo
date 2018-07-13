const RandomInt = require("./random_int.js"); 
 
 module.exports = function (totalUsers, maxTransactionsPerUser, totalProducts) {

  let transactions = [];
  let transactionId = 1;
  for (let index = 1; index <= totalUsers; index++) {
    let userTransactions = [];
    for (let jndex = 1; jndex <= RandomInt(maxTransactionsPerUser); jndex++) {
      userTransactions.push([
        ++transactionId,
        index,
        RandomInt(totalProducts),
      ]);
    }
    transactions.push(userTransactions);
  }

  var flatTransactions = transactions.reduce(function (array, userTransactions) {
    return array.concat(userTransactions);
  }, []);

  return flatTransactions;
 }