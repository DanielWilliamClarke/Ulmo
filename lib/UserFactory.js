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
      callback(data.map(d => {
        return {
          name: d.productName,
          price: currencyFormatter.format(d.productPrice, { code: 'GBP' })
        };
      }));
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
          amount: currencyFormatter.format(d.amount, { code: 'GBP' }).UserFactory,
          timestamp: s.timestamp
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
      callback(data.map(d => currencyFormatter.format(d.amount, { code: 'GBP' })));
    });
  }

  GetUserNetBalance(userID, callback) {
    const salaryItemSql =
      `SELECT  
        SUM(s.amount) as totalPaid,
        SUM(p.productPrice) as totalBought,
        SUM(s.amount) - SUM(p.productPrice) as netBalance
       FROM salary AS s
        INNER JOIN user AS u
          ON s.userId = u.userId	
        INNER JOIN transaction AS t
          ON t.userId = u.userId	
        INNER JOIN product AS p
          ON t.productId = p.productId	
      WHERE u.userId = 3`

    this.databaseConnection.query(salaryItemSql, [userID], function (err, data) {
      if (err) throw err;
      callback(data.map(d => {
        return {
          paid: currencyFormatter.format(d.totalPaid, { code: 'GBP' }),
          bought: currencyFormatter.format(d.totalBought, { code: 'GBP' }),
          netBalance: currencyFormatter.format(d.netBalance, { code: 'GBP' }),
        };
      }));
    });
  }

  GetUserWhoseBalanceIsGreaterThan(amount, callback) {
    const salaryItemSql =
    `SELECT  
      u.userName,
      u.userEmail,
      SUM(s.amount) - SUM(p.productPrice) as netBalance
      FROM salary AS s
      INNER JOIN user AS u
        ON s.userId = u.userId	
      INNER JOIN transaction AS t
        ON t.userId = u.userId	
      INNER JOIN product AS p
        ON t.productId = p.productId	
      GROUP BY u.userId
      ORDER BY u.userId`

    this.databaseConnection.query(salaryItemSql, [amount], function (err, data) {
      if (err) throw err;

      var filteredUsers = data.filter(d => d.netBalance > amount).map(d => {
        return {
          userName: d.userName,
          userEmail: d.userEmail,
          netBalance: currencyFormatter.format(d.netBalance, { code: 'GBP' })
        }
      });     
      
      console.log(filteredUsers);

      callback(filteredUsers);
    });
  }
}
