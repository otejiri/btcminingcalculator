const { Converter } = require("../../frontend/src/common/hash-converter");
const { getDevicesInfo } = require("./getDevicesInfo");

const DeviceList = require("../models");

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
    const result = {
      profitHash: value,
      data: finalCalcSet,
    };
    return result;
  }

  console.log(run(value));
};
