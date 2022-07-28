// server
require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

const Routes = require("./routes");

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get("/", Routes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
