const createApp = require('./create_app');
const createCustomerDbService = require('./data/customer_db_service');
const createScheduler = require('./services/scheduler');

const customerDbService = createCustomerDbService('deli_customers.json');
const app = createApp(customerDbService);

// Setup server port
const port = process.env.PORT || 8080;

createScheduler(customerDbService).scheduleSortTransactions();

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running API on port " + port);
});