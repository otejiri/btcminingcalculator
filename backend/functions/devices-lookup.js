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

module.exports.getDevices = async (value) => {
  await filterDevices();
  console.log(devicesArray);
  const array = [];
  for (let i = 0; i < devicesArray.length; i++) {
    const ob = devicesArray[i]["algorithms"];
    for (var key in ob) {
      if (ob.hasOwnProperty(key)) {
        const speed = Converter(ob[key]["speed"], "th", "h");

        array.push(speed);
      }
    }
  }
  const numOfTimes = [];
  const remainder = [];

  const val = [];
  const data = [];

  let diff = true;
  let hashPower = 0;

  hashPower = Converter(value, "th", "h");
  const modulo = async () => {
    for (let i = 0; i < array.length; i++) {
      let num = hashPower / array[i];
      let rem = hashPower % array[i];

      if (num >= 1) {
        numOfTimes.push(num);
        remainder.push(rem);
        val.push({ val: array[i], no: Math.floor(num) });
      }
    }

    let minTimes = Math.min(...numOfTimes);
    let index = numOfTimes.indexOf(minTimes);
    let valueLeft = remainder[index];

    if (valueLeft === hashPower) {
      diff = false;
      return false;
    }
    data.push(val[index]);
    hashPower = valueLeft;
  };
  while (diff) {
    await modulo();
  }

  const deviceData = [];
  const initialValue = 0;

  const hash = [];

  for (let k = 0; k < data.length; k++) {
    hash.push(data[k]["val"] * data[k]["no"]);
  }
  const sumWithInitial = hash.reduce(
    (previousValue, currentValue) =>
      parseInt(previousValue) + parseInt(currentValue),
    initialValue
  );

  for (let i = 0; i < devicesArray.length; i++) {
    const ob = devicesArray[i]["algorithms"];
    for (var key in ob) {
      if (ob.hasOwnProperty(key)) {
        s = ob[key]["speed"];
        const speed = Converter(s, "th", "h");
        for (let j = 0; j < data.length; j++) {
          const sp = data[j]["val"];
          if (speed === sp) {
            let num = data[j]["no"];
            let info = {
              name: devicesArray[i]["name"],
              speed: ob[key]["speed"],
              power: ob[key]["power"],
              url: devicesArray[i]["url"],
              type: devicesArray[i]["type"],
              brand: devicesArray[i]["brand"],
              algorithm: key,
              specs: devicesArray[i]["specs"],
            };
            deviceData.push({
              totalHash: sumWithInitial,
              info: info,
              num: num,
            });
          }
        }
      }
    }
  }
  return deviceData;
};
