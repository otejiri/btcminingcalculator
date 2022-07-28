// hashrate converter units
const fmt = {
  h: 1,
  kh: 1e-3,
  mh: 1e-6,
  gh: 1e-9,
  th: 1e-12,
  ph: 1e-15,
  eh: 1e-18,
  zh: 1e-1,
};

// long decimals to string
function toPlainString(num) {
  return ("" + +num).replace(
    /(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function (a, b, c, d, e) {
      return e < 0
        ? b + "0." + Array(1 - e - c.length).join(0) + c + d
        : b + c + d + Array(e - d.length + 1).join(0);
    }
  );
}

// hashrate converter
module.exports.Converter = (value, newUnit, currUnit) => {
  if ((newUnit || "gh") in fmt) {
    const val = value;
    const hash = val / fmt[currUnit];
    const convertedHash = toPlainString(hash * fmt[newUnit]);
    return convertedHash;
  }

  return 1;
};
