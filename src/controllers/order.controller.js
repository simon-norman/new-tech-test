const geolib = require('geolib');

class OrderController {
  constructor(customerDbService, productDbService) {
    this.customerDbService = customerDbService;
    this.productDbService = productDbService;
  }

  create = async (request, response, next) => {
    const customer = await this.customerDbService.findOne(request.params.customerId);
    if (!customer) {
      response.status(401).json({ message: 'Customer not registered' });
    }
    // not awaited as below processes are not dependent on this
    this.customerRequestsService.insertOne(customer.id, customer.first_name, customer.last_name);

    const productNames = request.body.map(({ item }) => item);
    const productsOrdered = this.productDbService.findManyByName(productNames);

    const totalOrderAmount = request.body.reduce((total, currentProductOrder) => {
      const { price } = productsOrdered.find((product) => product.item === currentProductOrder.item);

      return total + (currentProductOrder.amount * price);
    });

    await this.productDbService.updateProductsLastOrdered(productNames);
    await this.customerDbService.addLatestTransaction(totalOrderAmount, request.params.customerId);

    response.status(200).json(responseData);
  }
}

const createOrderController = (customerDbService) => new OrderController(customerDbService);

module.exports = createOrderController;