module.exports = class Profitability {
  constructor(btcInfo, profitAmount) {
    this.difficulty = btcInfo.Difficulty;
    this.reward = btcInfo.BlockReward;
    this.usdRate = btcInfo.ExchangeRates;
    this.profitAmount = profitAmount;
  }

  getRate() {
    const exchanger = "Coinbase";
    const exchanges = this.usdRate;

    let dollarRate = 0;
    for (let i = 0; i < exchanges.length; i++) {
      if (exchanges[i].Exchange === exchanger) {
        dollarRate = exchanges[i].ToUSD;
      }
    }
    return dollarRate;
  }

  getProfit() {
    const d = this.difficulty; // difficulty
    const t = 86400; // per hour
    const b = this.reward; // btc reward
    const h = 210000000000000; //hashrate
    const profitUsd = this.profitAmount; // profit amount sent by client
    const rate = this.getRate(); // usd rate
    const toBtc = profitUsd / rate; // convert usd to BTC

    // const profit = (h * t * b) / (2 ** 32 * d); // mining calculator formular
    const hashPower = (toBtc * (2 ** 32 * d)) / (t * b); // get hash by profit

    return hashPower.toFixed(8);
  }
};
