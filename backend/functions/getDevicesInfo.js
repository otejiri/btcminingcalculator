const axios = require("axios");

module.exports.getDevicesInfo = async () => {
  const url = `https://api.minerstat.com/v2/hardware`;
  return axios
    .get(url)
    .then((response) => response["data"])
    .catch((error) => error);
};
