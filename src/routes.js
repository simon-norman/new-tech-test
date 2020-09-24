const express = require('express');

function createRoutes(customerController) {
  const router = express.Router();

  router.get('/customers', customerController.list);

  router.get(`/customers/:customerId/distance`, customerController.calculateDistance)

  return router;
}

module.exports = createRoutes;