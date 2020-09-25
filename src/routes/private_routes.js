const express = require('express');

function createPrivateRoutes(customerController, productController) {
  const router = express.Router();

  router.get('/customers', customerController.list);

  router.get(`/customers/:customer_id/distance`, customerController.calculateDistance);

  router.put('/products/:product_name/currency', productController.updateCurrency);

  router.post('/products', productController.add);

  return router;
}

module.exports = createPrivateRoutes;