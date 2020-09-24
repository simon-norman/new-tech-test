const geolib = require('geolib');

class ProductController {
  constructor(productDbService, fxExchange) {
    this.productDbService = productDbService;
    this.fxExchange = fxExchange;
  }

  updateCurrency = async (request, response, next) => {
    const product = await this.productDbService.findOne(request.params.product_name);
    const { supplier_details: { currency, country }, details: { price } } = product;

    const newPrice = await this.fxExchange.convertPrice(
      { old_currency: currency, new_currency: request.body.new_currency, old_price: price },
    );
    
    this.productDbService.updateOne({ 
      ...product, 
      supplier_details: { ...product.supplier_details, currency },
      details: { ...product.details, price: newPrice }
    })

    response.status(200);
    next();
  }

  add = async (request, response, next) => {
    await this.productDbService.insertOne(request.body);

    response.status(200);
  }
}

const createProductController = (productDbService, fxExchange) => new ProductController(productDbService, fxExchange);

module.exports = createProductController;