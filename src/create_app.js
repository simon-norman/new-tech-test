const express = require('express');
const createCustomerController = require('./controllers/customer.controller');
const createRoutes = require('./routes');
const bodyParser = require('body-parser');
const createCustomerDbService = require('./data/customer_db_service');

function createApp(customerDbService) {
  // Initialize the app
  const app = express();

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

  const customerController = createCustomerController(customerDbService);
  const routes = createRoutes(customerController);
  app.use('/', routes);

  return app;
}

module.exports = createApp;