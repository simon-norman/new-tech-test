const geolib = require('geolib');

class OrderController {
  constructor(customerDbService, productDbService, customerRequestsService) {
    this.customerDbService = customerDbService;
    this.productDbService = productDbService;
    this.customerRequestsService = customerRequestsService;
  }

  create = async (request, response) => {
    const customer = await this.customerDbService.findOne(request.params.customerId);
    if (!customer) {
      response.status(401).json({ message: 'Customer not registered' });
    }
   
    await this.customerRequestsService.insertOne(
      { customer_id: customer.id, customer_first_name: customer.first_name, customer_last_name: customer.last_name }
    );

    const productNames = request.body.map(({ item }) => item);
    const dbProducts = await this.productDbService.findManyByName(productNames);
    const totalOrderAmount = this.calculateTotalOrderAmount(request.body, dbProducts);

    await Promise.all([
      this.productDbService.updateProductsLastOrdered(productNames),
      this.customerDbService.addLatestTransaction(totalOrderAmount, request.params.customerId),
    ]);

    response.sendStatus(200);
  }

  calculateTotalOrderAmount(productOrders, dbProducts) {
    return productOrders.reduce((total, currentProductOrder) => {
      const { details: { price } } = dbProducts.find((product) => product.item === currentProductOrder.item);

      return total + (currentProductOrder.amount * parseFloat(price));
    }, 0);
  }
}

const createOrderController = (customerDbService, productDbService, customerRequestsService) => 
  new OrderController(customerDbService, productDbService, customerRequestsService);

module.exports = createOrderController;