const express = require('express');

function createPublicRoutes(ordersController) {
  const router = express.Router();

  router.post('/customers/:customerId/orders', ordersController.create);

  return router;
}

module.exports = createPublicRoutes;