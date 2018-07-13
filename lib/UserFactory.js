"use strict"

module.exports = class UserFactory {
  constructor(databaseConnection) {
    this.databaseConnection = databaseConnection
  }

  GetProductsByUser(userID, callback) {
    const productItemSql =
      `SELECT 
      p.productName, 
      p.productPrice
      FROM product AS p
      INNER JOIN transaction AS t 
      ON p.productId = t.productId
      INNER JOIN user AS u
      ON t.userId = u.userId	
      WHERE u.userId = ?;`

    this.databaseConnection.query(productItemSql, [userID], function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }

  GetUserTotalSpend(userID, callback) {
    const productItemSql =
      `SELECT  
     SUM(p.productPrice) as totalSpent
     FROM product AS p
     INNER JOIN transaction AS t 
     ON p.productId = t.productId
     INNER JOIN user AS u
     ON t.userId = u.userId	
     WHERE u.userId = ?;`

    this.databaseConnection.query(productItemSql, [userID], function (err, data) {
      if (err) throw err;
      callback(data);
    });
  }
}
