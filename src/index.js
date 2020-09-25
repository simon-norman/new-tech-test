const axios = require('axios');
const createApp = require('./create_app');
const createCustomerDbService = require('./data/customer/customer_db_service');
const createCustomerRequestsDbService = require('./data/customer_requests_db_service');
const createProductDbService = require('./data/product/product_db_service');
const createScheduler = require('./services/scheduler');
require('dotenv').config();

const customerDbService = createCustomerDbService('deli_customers.json');
const productDbService = createProductDbService('inventory.json');
const customerRequestsDbService = createCustomerRequestsDbService('customer_requests.json');
const fxHttp = axios.create({ baseURL: 'http://api.currencylayer.com' });

const app = createApp({ 
  customerDbService, 
  productDbService, 
  customerRequestsDbService,
  fxHttp, 
  fxAccessKey: process.env.EXCHANGE_RATE_KEY 
});

// Setup server port
const port = process.env.PORT || 8080;

createScheduler(customerDbService).scheduleSortTransactions();

// Launch app to listen to specified port
app.listen(port, function () {
  console.log("Running API on port " + port);
});