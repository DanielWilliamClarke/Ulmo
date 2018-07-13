const express = require('express');
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));

const userProductRouter = require("./routes/user_products_routes.js");
app.use(userProductRouter);
const salaryRouter = require("./routes/salary_routes.js");
app.use(salaryRouter);
const transactionRouter = require("./routes/transaction_routes.js");
app.use(transactionRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`API Server up at localhost:${port}`);
});