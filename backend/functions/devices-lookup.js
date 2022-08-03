const { Converter } = require("../../frontend/src/common/hash-converter");
const { getDevicesInfo } = require("./getDevicesInfo");

// this function transfors the returned devices list to include only bitcoin sha-256 algorithms
let devicesArray = [];
const filterDevices = async () => {
  devicesArray = [];
  const array = await getDevicesInfo();
  const nameCheck = [];
  for (let i = 0; i < array.length; i++) {
    const ob = array[i]["algorithms"];
    for (var key in ob) {
      var k = key.toLowerCase();
      if (k === "sha-256" && !nameCheck.includes(array[i]["name"])) {
        devicesArray.push(array[i]);
      }
    }
  }
  return true;
};

const DeviceList = require("../models");

module.exports.getDevices = async (value) => {
  const devicesList = await DeviceList.findAll();
  // create array of hashes and ids

  // list of timesInto to get minimum value of div
  const numOfTimes = [];

  // list of remainders
  const remainderList = [];

  const resultFromCalc = [];
  const data = [];

  let runCalc = true;

  // hashpower from profil calculation
  let hashPower = value;

  const deviceCalc = async () => {
    for (let j = 0; j < devicesList.length; j++) {
      const hashFromHashList = devicesList[j]["hash"];
      device = devicesList[j].dataValues;

      // calculation to get different hash to reach total profit hash
      // e.g if four device hash is [5,9,11,2,6] and total profit hash is 15, calculation should present [9,6]
      // absolute division value
      let timesInto = hashPower / hashFromHashList;

      // value left after division
      let remainder = hashPower % hashFromHashList;

      if (timesInto >= 1) {
        numOfTimes.push(timesInto);
        remainderList.push(remainder);
        resultFromCalc.push({
          ...device,
          times: Math.floor(timesInto),
        });
      }
    }
    // minimum number of times for division
    let minTimes = Math.min(...numOfTimes);

    let index = numOfTimes.indexOf(minTimes);
    let valueLeft = remainderList[index];

    if (valueLeft === hashPower) {
      runCalc = false;
      return false;
    }
    data.push(resultFromCalc[index]);
    hashPower = valueLeft;
  };
  console.log(data);
  while (runCalc) {
    await deviceCalc();
  }
  return data;
};
