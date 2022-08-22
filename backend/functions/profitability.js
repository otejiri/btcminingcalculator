module.exports = class Profitability {
  constructor(profitAmount, btcInfo) {
    this.difficulty = btcInfo.difficulty;
    this.reward = btcInfo.reward_block;
    this.usdRate = btcInfo.price;
    this.profitAmount = profitAmount;
  }

  getHashPower() {
    const d = this.difficulty; // difficulty
    const t = 86400; // per day
    const b = this.reward; // btc reward
    const profitUsd = this.profitAmount; // profit amount sent by client request
    const rate = this.usdRate; // usd rate
    const toBtc = profitUsd / rate; // convert usd to BTC

    // const profit = (h * t * b) / (2 ** 32 * d); // mining calculator formular
    const hashPower = (toBtc * (2 ** 32 * d)) / (t * b); // get hash by profit

    return hashPower.toFixed(8);
  }

  // getProfit() {
  //   const d = this.btcInfo.difficulty; // difficulty
  //   const t = 86400; // per day
  //   const b = this.btcInfo["reward_block"]; // btc reward
  //   const h = 210000000000000; //hashrate
  //   const profitUsd = this.profitAmount; // profit amount sent by client request
  //   const rate = this.btcInfo.price; // usd rate
  //   const toBtc = profitUsd / rate; // convert usd to BTC

  //   const profit = (h * t * b) / (2 ** 32 * d); // mining calculator formular
  //   // const hashPower = (toBtc * (2 ** 32 * d)) / (t * b); // get hash by profit

  //   return profit.toFixed(2);
  // }
};
