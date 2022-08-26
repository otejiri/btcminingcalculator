const { Converter } = require("../../frontend/src/common/hash-converter");

const { DeviceList } = require("../models");

module.exports.getDevices = async (value) => {
  const devicesList = await DeviceList.findAll();
  // create array of hashes and ids

  function calc(val) {
    const profitHash = val;

    const calcObj = [];
    for (let i = 0; i < devicesList.length; i++) {
      let iterHash = devicesList[i]["hash"];
      let timesInto = Math.floor(profitHash / iterHash);
      let hashValueLeft = profitHash % iterHash;
      let index = devicesList[i]["id"];

      let name = devicesList[i]["name"];
      let link = devicesList[i]["link"];
      let noise = devicesList[i]["noise"];
      let release = devicesList[i]["release"];
      let cost = devicesList[i]["cost"];
      let power = devicesList[i]["power"];

      let obj = {
        index,
        iterHash,
        timesInto,
        hashValueLeft,
        name,
        link,
        noise,
        release,
        cost,
        power,
      };
      if (timesInto >= 1) {
        calcObj.push(obj);
      }
    }
    return calcObj;
  }
  function run(val) {
    const initSet = calc(val);
    const finalCalcSet = [];

    for (let i = 0; i < initSet.length; i++) {
      const loopedDevice = initSet[i];
      const stagedDeviceSet = [loopedDevice];
      if (loopedDevice.hashValueLeft > 0) {
        let keepAlive = true;
        let newValueLeft = loopedDevice.hashValueLeft;
        while (keepAlive) {
          const reCalcSet = calc(newValueLeft);
          if (reCalcSet.length > 0) {
            const device = reCalcSet[0];
            stagedDeviceSet.push(device);
            newValueLeft = device.hashValueLeft;
          } else {
            keepAlive = false;
          }
        }
        finalCalcSet.push(stagedDeviceSet);
      } else {
        finalCalcSet.push(stagedDeviceSet);
      }
    }

    const constructedSet = [];

    for (let j = 0; j < finalCalcSet.length; j++) {
      const final = finalCalcSet[j];

      let totalDevice = 0;
      let totalHash = 0;
      let totalPower = 0;
      let totalNoise = 0;
      let totalCost = 0;

      for (let k = 0; k < final.length; k++) {
        totalDevice = totalDevice + final[k]["timesInto"];
        totalHash = totalHash + final[k]["iterHash"] * final[k]["timesInto"];
        totalPower = totalPower + final[k]["power"] * final[k]["timesInto"];
        totalNoise = totalNoise + final[k]["noise"] * final[k]["timesInto"];
        totalCost = totalCost + final[k]["cost"] * final[k]["timesInto"];
      }
      let obj = {
        totalDevice,
        totalHash,
        totalPower,
        totalNoise,
        totalCost,
      };
      let responseData = { ...obj, devices: final };
      constructedSet.push(responseData);
    }
    const result = {
      profitHash: value,
      noOfSetup: constructedSet.length,
      data: constructedSet,
    };
    return result;
  }

  let deviceSetup = run(value);
  return deviceSetup;
};
