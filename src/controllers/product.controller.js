const geolib = require('geolib');

class ProductController {
  constructor(productDbService, fxExchange) {
    this.productDbService = productDbService;
    this.fxExchange = fxExchange;
  }

  updateCurrency = async (request, response) => {
    const product = await this.productDbService.findOne(request.params.product_name);
    const { supplier_details: { currency }, details: { price } } = product;

    const newPrice = await this.fxExchange.convertPrice(
      { old_currency: currency, new_currency: request.body.new_currency, old_price: price },
    );
    
    const updatedProduct = { 
      ...product, 
      supplier_details: { ...product.supplier_details, currency: request.body.new_currency },
      details: { ...product.details, price: newPrice }
    };
    await this.productDbService.updateOne(updatedProduct);

    response.status(200).json(updatedProduct);
  }

  add = async (request, response) => {
    const { item, details, supplier_details } = request.body;
    // whilst request body and product db structures are the same, specifically mapping data to
    // prevent any random data being inserted (though in full app would add api validation)
    const newProduct = {
      item,
      details: {
        price: details.price,
        amount: details.amount,
        color: details.color,
        color_hex: details.color_hex
      },
      supplier_details: {
        country: supplier_details.country,
        country_code: supplier_details.country_code,
        currency: supplier_details.currency,
        contact: {
          phone: supplier_details.contact.phone,
          email: supplier_details.contact.email
        }
      }
    };

    await this.productDbService.insertOne(newProduct);

    response.status(200).json(newProduct);
  }
}

const createProductController = (productDbService, fxExchange) => new ProductController(productDbService, fxExchange);

module.exports = createProductController;