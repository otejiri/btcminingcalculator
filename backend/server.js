// server
require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const Routes = require("./routes");
const connection = require("./util/database");

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", Routes);

connection
  .sync()
  .then((result) => {
    app.listen(PORT);
  })
  .catch((err) => {
    console.log(err);
  });
