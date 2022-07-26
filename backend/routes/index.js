const express = require("express");
const { getProfitability } = require("../controllers/btcInfo");

const router = express.Router();

router.get("/", getProfitability);

module.exports = router;
