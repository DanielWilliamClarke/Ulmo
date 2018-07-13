 module.exports = function (total) {
  let salaryArray = [];
  for (let index = 1; index <= total; index++) {
    salaryArray.push([
      index,
      index * 10
    ]);
  }
  return salaryArray;
 }