
module.exports = function (total) {
  let usersArray = [];
  for (let index = 1; index <= total; index++) {
    usersArray.push([
      index,
      "Quit Genius User" + index,
      `user${index}@quitgenius.com`
    ]);
  }
  return usersArray;
 }