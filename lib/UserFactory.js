"use strict"

const currencyFormatter = require('currency-formatter');

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
      callback(data.map(d => currencyFormatter.format(d.totalSpent, { code: 'USD' })));
    });
  }

  GetSalaryPaymentsByUser(userID, callback) {
    const salaryItemSql =
      `SELECT  
        s.amount,
        s.timestamp
        FROM salary AS s
        INNER JOIN user AS u
        ON s.userId = u.userId	
        WHERE u.userId = ?
	    	ORDER BY s.timestamp ASC;`

    this.databaseConnection.query(salaryItemSql, [userID], function (err, data) {
      if (err) throw err;
      callback(data.map(d => {
        return {
          amount: currencyFormatter.format(d.amount, { code: 'USD' })
        };
      }));
    })
  }

  GetUserTotalSalaried(userID, callback) {
    const salaryItemSql =
      `SELECT  
        SUM(s.amount) AS totalPaid
        FROM salary AS s
        INNER JOIN user AS u
        ON s.userId = u.userId	
        WHERE u.userId = ?
	    	ORDER BY s.timestamp ASC;`

    this.databaseConnection.query(salaryItemSql, [userID], function (err, data) {
      if (err) throw err;
      callback(data.map(d => currencyFormatter.format(d.amount, { code: 'USD' })));
    });
  }
}
