const { getDevices } = require("../functions/devices-lookup");
const Profitability = require("../functions/profitability");
// const {
//   AddArrayValues,
// } = require("../../frontend/src/common/sum-array-values");
const { getBtcInfo } = require("../functions/getBtcInfo");
const { CountryRisk } = require("../models");
require("dotenv").config();

exports.getProfitability = async (req, res, next) => {
  const profitAmount = req.query.profit;
  const poolHash = req.query.pool;
  const country = req.query.country;
  const riskLevel = await CountryRisk.findOne({
    where: { name: country },
  })
    .then((val) => val.level)
    .catch((err) => console.log(err));

  // const profitabilty = new Profitability(await btcInfo());

  const btcInfoResponse = await getBtcInfo();
  const btcInfoData = btcInfoResponse["data"][0];

  const profitabilty = new Profitability(profitAmount, btcInfoData, poolHash);

  const hashPower = profitabilty.getHashPower();

  const devices = await getDevices(hashPower);

  res.status(200).send({ ...devices, risk: riskLevel });
};
