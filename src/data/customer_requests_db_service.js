const DbService = require("./db_service");
const { DateTime } = require('luxon');

class CustomerRequestsDbService extends DbService {
  async insertOne({ customer_first_name, customer_last_name, customer_id }) {
    const customerRequests = await this.findMany();
    const newRequest = {
      date: DateTime.utc().toLocaleString(),
      customer_first_name,
      customer_last_name,
      customer_id,
    };
    const updatedRequests = [newRequest, ...customerRequests];

    await this.updateMany(updatedRequests);
  }
}

const createCustomerRequestsDbService = (path) => new CustomerRequestsDbService(path);

module.exports = createCustomerRequestsDbService;