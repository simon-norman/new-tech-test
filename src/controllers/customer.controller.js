const geolib = require('geolib');

class CustomerController {
  constructor(customerDbService) {
    this.customerDbService = customerDbService;
  }

  list = async (request, response, next) => {
    const customers = await this.customerDbService.findMany();
    const responseData = customers.map(({ first_name, last_name, email }) => ({ first_name, last_name, email }));

    response.status(200).json(responseData);
    next();
  }

  calculateDistance = async (request, response, next) => {
    const customer = await this.customerDbService.findOne(request.params.customerId);
    const distance = geolib.getDistance(customer.address.coordinates, request.query.location, 1);

    response.status(200).json({ distance });
    next();
  }
}

const createCustomerController = (customerDbService) => new CustomerController(customerDbService);

module.exports = createCustomerController;