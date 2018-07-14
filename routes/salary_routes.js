const express = require("express");

const connectionPool = require("./../db/connection.js");
const UserFactory = require("./../lib/UserFactory.js");
const currencyFormatter = require('currency-formatter');

const router = express.Router();

router.get("/users/:id/salary", (req, res) => {
  const userFactory = new UserFactory(connectionPool, currencyFormatter);
  userFactory.GetSalaryPaymentsByUser(req.params.id, data => res.json(data));
});

router.get("/users/:id/balanceGained", (req, res) => {
  const userFactory = new UserFactory(connectionPool, currencyFormatter);
  userFactory.GetUserTotalSalaried(req.params.id, data => res.json(data));
});

module.exports = router;