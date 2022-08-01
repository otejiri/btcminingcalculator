module.exports = class Profitability {
  constructor(btcInfo, profitAmount, btcInfoData) {
    this.difficulty = btcInfo.Difficulty;
    this.reward = btcInfo.BlockReward;
    this.usdRate = btcInfo.ExchangeRates;
    this.profitAmount = profitAmount;
    this.btcInfo = btcInfoData;
  }

  getHashPower() {
    const d = this.btcInfo.difficulty; // difficulty
    const t = 86400; // per day
    const b = this.btcInfo["reward_block"]; // btc reward
    const h = 210000000000000; //hashrate
    const profitUsd = this.profitAmount; // profit amount sent by client request
    const rate = this.btcInfo.price; // usd rate
    const toBtc = profitUsd / rate; // convert usd to BTC

    // const profit = (h * t * b) / (2 ** 32 * d); // mining calculator formular
    const hashPower = (toBtc * (2 ** 32 * d)) / (t * b); // get hash by profit

    return hashPower.toFixed(8);
  }

  getProfit() {
    const d = this.btcInfo.difficulty; // difficulty
    const t = 86400; // per day
    const b = this.btcInfo["reward_block"]; // btc reward
    const h = 210000000000000; //hashrate
    const profitUsd = this.profitAmount; // profit amount sent by client request
    const rate = this.btcInfo.price; // usd rate
    const toBtc = profitUsd / rate; // convert usd to BTC

    const profit = (h * t * b) / (2 ** 32 * d); // mining calculator formular
    // const hashPower = (toBtc * (2 ** 32 * d)) / (t * b); // get hash by profit

    return profit.toFixed(2);
  }
};
