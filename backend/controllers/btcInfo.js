const axios = require("axios");
const { getDevices } = require("../functions/devices-lookup");
const Profitability = require("../functions/profitability");
const {
  AddArrayValues,
} = require("../../frontend/src/common/sum-array-values");
const { apiRes } = require("../res");
const { getBtcInfo } = require("../functions/getBtcInfo");

require("dotenv").config();

exports.getProfitability = async (req, res, next) => {
  const profitAmount = req.query.profit;

  const r = apiRes;

  // const profitabilty = new Profitability(await btcInfo());

  const btcInfoResponse = await getBtcInfo();
  const btcInfoData = btcInfoResponse["data"][0];

  const profitabilty = new Profitability(r, profitAmount, btcInfoData);

  const hashPower = profitabilty.getHashPower();

  const devices = await getDevices(hashPower);

  const totalDevices = [];
  const totalHash = [];

  for (let i = 0; i < devices.length; i++) {
    totalDevices.push(devices[i]["num"]);
  }
  for (let j = 0; j < devices.length; j++) {
    totalHash.push(devices[j]["info"]["speed"] * devices[j]["num"]);
  }

  const deviceTotal = await AddArrayValues(totalDevices);
  const hashTotal = await AddArrayValues(totalHash);

  const response = {
    status: true,
    data: {
      hashPower: hashPower,
      devicesHashTotal: hashTotal,
      noOfDevices: deviceTotal,
      devices: devices,
    },
  };

  res.status(200).send(response);
};
