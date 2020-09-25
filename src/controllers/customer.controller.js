const geolib = require('geolib');

class CustomerController {
  constructor(customerDbService) {
    this.customerDbService = customerDbService;
  }

  list = async (request, response) => {
    const customers = await this.customerDbService.findMany();
    const responseData = customers.map(({ first_name, last_name, email }) => ({ first_name, last_name, email }));

    response.status(200).json(responseData);
  }

  calculateDistance = async (request, response) => {
    const customer = await this.customerDbService.findOne(request.params.customer_id);
    const location = { latitude: request.query.latitude, longitude: request.query.longitude };
    const distance = geolib.getDistance(customer.address.coordinates, location, 1);

    response.status(200).json({ distance });
  }
}

const createCustomerController = (customerDbService) => new CustomerController(customerDbService);

module.exports = createCustomerController;