const axios = require('axios');
const createApp = require('./create_app');
const createCustomerDbService = require('./data/customer/customer_db_service');
const createCustomerRequestsDbService = require('./data/customer/customer_requests_db_service');
const createProductDbService = require('./data/product/product_db_service');
const createScheduler = require('./services/scheduler');
const path = require('path');
require('dotenv').config();

const customerDbService = createCustomerDbService(path.join(__dirname, '/data/customer/deli_customers.json'));
const productDbService = createProductDbService(path.join(__dirname, '/data/product/inventory.json'));
const customerRequestsService = createCustomerRequestsDbService(path.join(__dirname, '/data/customer/customer_requests.json'));
const fxHttp = axios.create({ baseURL: 'http://api.currencylayer.com' });

// dbServices and fxHttp injected for ease of mocking in tests
const app = createApp({ 
  customerDbService, 
  productDbService, 
  customerRequestsService,
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