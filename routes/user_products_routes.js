const express = require("express");

const connectionPool = require("./../db/connection.js");
const UserFactory = require("./../lib/UserFactory.js");

const router = express.Router();

router.get("/users/:id/products", (req, res) => {
  const userFactory = new UserFactory(connectionPool);
  userFactory.GetProductsByUser(req.params.id, data => res.json(data));
});

router.get("/users/:id/balancePaid", (req, res) => {
  const userFactory = new UserFactory(connectionPool);
  userFactory.GetUserTotalSpend(req.params.id, data => res.json(data));
});

module.exports = router;