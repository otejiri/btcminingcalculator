const axios = require("axios");

module.exports.getBtcInfo = async () => {
  const url = `https://api.minerstat.com/v2/coins?list=BTC`;
  return axios
    .get(url)
    .then((response) => response)
    .catch((error) => error);
};
