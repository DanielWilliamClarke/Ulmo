 module.exports = function (total) {
  let productsArray = [];
  for (let index = 1; index <= total; index++) {
    productsArray.push([
      index,
      "Ulmo Product" + index,
      index * 10
    ]);
  }
  return productsArray;
 }
