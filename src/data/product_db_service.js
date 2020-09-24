const DbService = require("./db_service");

class ProductDbService extends DbService {
  async findOne(name) {
    const products = await this.findMany();

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
}

const createProductDbService = (path) => new ProductDbService(path);

module.exports = createProductDbService;