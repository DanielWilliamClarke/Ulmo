const RandomInt = require("./random_int.js");

module.exports = function (totalUsers, maximumPaymentsPerUser) {

  let maxPayment = 2000;

  let salaryArray = [];
  for (let index = 1; index <= totalUsers; index++) {
    let userSalaryPayments = [];
    for (let jndex = 1; jndex <= RandomInt(maximumPaymentsPerUser); jndex++) {
      userSalaryPayments.push([
        index,
        RandomInt(maxPayment)
      ]);
    }
    salaryArray.push(userSalaryPayments);
  }

  var flatSalaries = salaryArray.reduce(function (array, payments) {
    return array.concat(payments);
  }, []);

  return flatSalaries;
}