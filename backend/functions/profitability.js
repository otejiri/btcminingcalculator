module.exports = class Profitability {
  constructor(btcInfo) {
    this.difficulty = btcInfo.Difficulty;
    this.reward = btcInfo.BlockReward;
    this.usdRate = btcInfo.ExchangeRates;
  }

  profitCalc() {
    const d = this.difficulty; // difficulty
    const t = 3600; // time
    const b = this.reward; // btc reward
    const h = 210000000000000; //hashrate

    const profit = (h * t * b) / (2 ** 32 * d); // mining calculator formular

    return profit.toFixed(8);
  }

  getRate() {
    const exchanger = "Coinbase";
    const exchanges = this.usdRate;
    for (let i = 0; i < exchanges; i++) {
      if (exchanges[i].Exchange === exchanger) {
        dollarRate = exchanges[i].ToUSD;
      }
    }
  }
  getProfit() {
    return this.profitCalc();
  }
};
