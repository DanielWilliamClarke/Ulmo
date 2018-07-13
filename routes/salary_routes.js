

const express = require("express");

const connectionPool = require("./../db/connection.js");
const UserFactory = require("./../lib/UserFactory.js");

const router = express.Router();

router.get("/users/:id/salary", (req, res) => {
  const userFactory = new UserFactory(connectionPool);
  userFactory.GetSalaryPaymentsByUser(req.params.id, data => res.json(data));
});

router.get("/users/:id/totalPaid", (req, res) => {
  const userFactory = new UserFactory(connectionPool);
  userFactory.GetUserTotalSalaried(req.params.id, data => res.json(data));
});

module.exports = router;