const express = require('express');

function createRoutes(customerController) {
  const router = express.Router();

  router.get('/customers', customerController.list);

  return router;
}

module.exports = createRoutes;