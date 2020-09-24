const express = require('express');
const createCustomerController = require('./controllers/customer.controller');
const createProductController = require('./controllers/product.controller');
const createRoutes = require('./routes');
const bodyParser = require('body-parser');
const createFxExchange = require('./services/fx_exchange');
const authenticateRequest = require('./services/authentication');

function createApp(customerDbService, productDbService, fxHttp, fxAccessKey) {
  const app = express();

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
  
  app.use(authenticateRequest);

  const fxService = createFxExchange(fxHttp, fxAccessKey);

  const customerController = createCustomerController(customerDbService);
  const productController = createProductController(productDbService, fxService);

  const routes = createRoutes(customerController, productController);
  app.use('/', routes);

  return app;
}

module.exports = createApp;