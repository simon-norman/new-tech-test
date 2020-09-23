class CustomerController {
  constructor(customerDbService) {
    this.customerDbService = customerDbService;
  }

  list = async (request, response, next) => {
    const customers = await this.customerDbService.findAll();
    response.status(200).json(customers);
    next();
  }
}

const createCustomerController = (customerDbService) => new CustomerController(customerDbService);

module.exports = createCustomerController;