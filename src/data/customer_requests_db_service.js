const DbService = require("./db_service");
const { DateTime } = require('luxon');

class CustomerRequestsDbService extends DbService {
  async insertOne(customerFirstName, customerLastName, customerId) {
    const customerRequests = await this.findMany();
    const newRequest = {
      date: DateTime.utc().toLocaleString(),
      customer_first_name: customerFirstName,
      customer_last_name: customerLastName,
      customer_id: customerId,
    };
    const updatedRequests = [newRequest, ...customerRequests];

    await this.updateMany(updatedRequests);
  }
}

const createCustomerDbService = (path) => new CustomerDbService(path);

module.exports = createCustomerDbService;