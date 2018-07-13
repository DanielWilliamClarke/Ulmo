const express = require("express");

const connectionPool = require("./../db/connection.js");
const UserFactory = require("./../lib/UserFactory.js");

const router = express.Router();

router.get("/users/:id/netBalance", (req, res) => {
  const userFactory = new UserFactory(connectionPool);
  userFactory.GetUserNetBalance(req.params.id, data => res.json(data));
});

module.exports = router;