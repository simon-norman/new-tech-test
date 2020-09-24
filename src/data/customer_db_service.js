const DbService = require("./db_service");

class CustomerDbService extends DbService {
  async sortRecentTransactions() {
    const customers = await this.findMany();

    const updatedCustomers = customers.map((customer) => {
      const updatedTransactions = customer.last_transactions.sort((transactionA, transactionB) => {
        return new Date(transactionB.date) - new Date(transactionA.date);
      });

      return {
        ...customer,
        last_transactions: updatedTransactions,
      }
    });

    await this.updateMany(updatedCustomers);
  }

  async findOne(id) {
    const customers = await this.findMany();

    return customers.find((customer) => customer.id.toString() === id);
  }
}

const createCustomerDbService = (path) => new CustomerDbService(path);

module.exports = createCustomerDbService;