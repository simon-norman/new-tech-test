class FxExchange {
  constructor(http, accessKey) {
    this.http = http;
    this.accessKey = accessKey;
  }

  async convertPrice({ old_currency, new_currency, old_price }) {
    const { data } = await this.http.get(
      '/live', 
      { params: { source: old_currency, currencies: new_currency, access_key: this.accessKey } }
    );
    const rate = data.quotes[`${old_currency}${new_currency}`];

    return (rate * old_price).toFixed(2);
  }
}

const createFxExchange = (http, accessKey) => new FxExchange(http, accessKey);

module.exports = createFxExchange;