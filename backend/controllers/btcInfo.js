const axios = require("axios");
const { Converter } = require("../../frontend/src/common/hash-converter");
const { getDevices } = require("../functions/devices-lookup");
const Profitability = require("../functions/profitability");
const { apiRes } = require("../res");

require("dotenv").config();

const getList = async (hashPower) => {
  return getDevices(hashPower);
};

exports.getProfitability = async (req, res, next) => {
  const profitAmount = req.query.profit;

  const r = apiRes;

  // const profitabilty = new Profitability(await btcInfo());
  const profitabilty = new Profitability(r, profitAmount);

  const hashPower = profitabilty.getProfit();
  const convertedHashPower = parseFloat(
    Converter(hashPower, "th", "h")
  ).toFixed(2);

  const devices = await getList(hashPower);
  const response = {
    status: true,
    data: {
      hashPower: convertedHashPower,
      devices: devices,
    },
  };
  res.status(200).send(response);
};
