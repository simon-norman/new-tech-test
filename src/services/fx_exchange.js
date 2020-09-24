class FxExchange {
  constructor(http, accessKey) {
    this.http = http;
    this.accessKey = accessKey;
  }

  async convertPrice({ old_currency, new_currency, old_price }) {
    const latestRates = await this.http.get(
      '/live', 
      { params: { source: old_currency, currencies: new_currency, access_key: this.accessKey } }
    );
    const rate = latestRates[`${old_currency}${new_currency}`];

    return rate * old_price;
  }
}

const createFxExchange = (http, accessKey) => new FxExchange(http, accessKey);

module.exports = createFxExchange;