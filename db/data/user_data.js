
module.exports = function (total) {
  let usersArray = [];
  for (let index = 1; index <= total; index++) {
    usersArray.push([
      index,
      "Ulmo User" + index,
      `user${index}@ulmo.com`
    ]);
  }
  return usersArray;
 }
