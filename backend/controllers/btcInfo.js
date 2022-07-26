const axios = require("axios");
const Profitability = require("../functions/profitability");
const { apiRes } = require("../res");

require("dotenv").config();

const btcInfo = async () => {
  try {
    return await axios
      .get(
        `http://www.coinwarz.com/v1/api/coininformation/?apikey=${process.env.COINWARZ_API_KEY}&cointag=BTC`
      )
      .then((res) => {
        return res.data.Data;
      });
  } catch (error) {
    return error;
  }
};

exports.getProfitability = async (req, res, next) => {
  const resp = apiRes;
  // const profitabilty = new Profitability(await btcInfo());
  const profitabilty = new Profitability(resp);

  const prof = profitabilty.getProfit();

  console.log(prof);

  res.status(200).send({ message: prof });
};
