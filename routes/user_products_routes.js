

const express = require("express");

const connectionPool = require("./../db/connection.js");

const router = express.Router();

router.get("/users/:id/products", (req, res) => {

  const sql = `SELECT 
    p.productName, 
    p.productPrice
    FROM product AS p
    INNER JOIN transaction AS t 
    ON p.productId = t.productId
    INNER JOIN user AS u
    ON t.userId = u.userId	
    WHERE u.userId = ?;`

  connectionPool.query(sql, [req.params.id], function (err, data) {
    if(err) throw err;
    res.json(data);
  });
});

module.exports = router;