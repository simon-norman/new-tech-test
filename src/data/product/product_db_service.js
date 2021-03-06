const DbService = require("../db_service");
const { DateTime } = require('luxon');

class ProductDbService extends DbService {
  async findManyWithPricesAsFloat() {
    const products = await this.findMany();

    return products.map((product) => ({
      ...product,
      details: {
        ...product.details,
        price: parseFloat(product.details.price),
      }
    }));
  }

  async findOne(name) {
    const products = await this.findManyWithPricesAsFloat();

    return products.find((product) => product.item === name);
  }

  async updateOne(updatedProduct) {
    const products = await this.findMany();
    const productIndex = products.findIndex((product) => product.item === updatedProduct.item);
    products.splice(productIndex, 1, updatedProduct);

    await this.updateMany(products);
  }

  async insertOne(product) {
    const products = await this.findMany();

    await this.write([...products, product]);
  }

  async findManyByName(names) {
    const products = await this.findManyWithPricesAsFloat();

    return products.filter((product) => names.includes(product.item));
  }

  async updateProductsLastOrdered(names) {
    const products = await this.findMany();
    const updatedProducts = products.map((product) => {
      return names.includes(product.item) 
        ? { ...product, details: { ...product.details, last_purchased: DateTime.utc().toLocaleString() } } 
        : product;
    });

    await this.updateMany(updatedProducts);
  }
}

const createProductDbService = (path) => new ProductDbService(path);

module.exports = createProductDbService;