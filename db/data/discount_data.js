const RandomInt = require("./random_int.js"); 
 
 module.exports = function (totalUsersDiscounted, totalUsers, totalProducts) {
  let discountArray = [];
  for (let index = 1; index <= totalUsersDiscounted; index++) {
    discountArray.push([
      RandomInt(totalUsers),
      RandomInt(totalProducts),
      RandomInt(totalUsersDiscounted) / totalUsersDiscounted * 100
    ]);
  }
  return discountArray;
 }