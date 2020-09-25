const express = require('express');
const createCustomerController = require('./controllers/customer.controller');
const createProductController = require('./controllers/product.controller');
const createPrivateRoutes = require('./routes/private_routes');
const bodyParser = require('body-parser');
const createFxExchange = require('./services/fx_exchange');
const authenticateRequest = require('./services/authentication');
const createPublicRoutes = require('./routes/public_routes');
const createOrderController = require('./controllers/order.controller');

function createApp(deps) {
  const { customerDbService, productDbService, fxHttp, fxAccessKey, customerRequestsService } = deps;
  const app = express();

  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

  const ordersController = createOrderController(customerDbService, productDbService, customerRequestsService);

  const publicRoutes = createPublicRoutes(ordersController);
  app.use('/', publicRoutes);

  // authenticating requests only for private routes
  app.use(authenticateRequest);

  const fxService = createFxExchange(fxHttp, fxAccessKey);
  const customerController = createCustomerController(customerDbService);
  const productController = createProductController(productDbService, fxService);

  const privateRoutes = createPrivateRoutes(customerController, productController);
  app.use('/', privateRoutes);

  return app;
}

module.exports = createApp;