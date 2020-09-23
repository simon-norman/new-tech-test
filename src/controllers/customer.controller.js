class CustomerController {
  constructor(customerDbService) {
    this.customerDbService = customerDbService;
  }

  list = async (request, response, next) => {
    const customers = await this.customerDbService.findAll();
    const responseData = customers.map(({ first_name, last_name, email }) => ({ first_name, last_name, email }));

    response.status(200).json(responseData);
    next();
  }
}

const createCustomerController = (customerDbService) => new CustomerController(customerDbService);

module.exports = createCustomerController;