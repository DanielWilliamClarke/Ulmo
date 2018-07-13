const express = require('express');
const morgan = require("morgan");

const app = express();

app.use(morgan("combined"));

app.get("/users/:id/products", (req, res) => {

  res.send(`Hello world ${req.params.id}`);
  

});

app.get("/", (req, res) => {
  res.send("Hello world");
});

const port = 3000;
app.listen(port, () => {
  console.log(`API Server up at localhost:${port}`);
});