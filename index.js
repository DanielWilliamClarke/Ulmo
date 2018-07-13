const express = require('express');
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));

const userProductRouter = require("./routes/user_products_routes.js");
app.use(userProductRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Server up at localhost:${port}`);
});