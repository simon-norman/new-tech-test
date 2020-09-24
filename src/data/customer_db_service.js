const DbService = require("./db_service");
const { DateTime } = require('luxon');

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

  async addLatestTransaction(amount, customerId) {
    const customers = await this.findMany();
    const transaction = { amount, date: DateTime.utc().toLocaleString() }

    const updatedCustomers = customers.map((customer) => {
      return customer.id.toString() === customerId
        ? { ...customer, last_transactions: [transaction, ...customer.last_transactions]} 
        : customer;
    });

    await this.updateMany(updatedCustomers);
  }
}

const createCustomerDbService = (path) => new CustomerDbService(path);

module.exports = createCustomerDbService;