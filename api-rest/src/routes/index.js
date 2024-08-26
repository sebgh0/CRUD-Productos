const express = require('express');

const productRouter = require('./products.routes');
const categoryRouter = require('./categories.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/categories', categoryRouter);
}

module.exports = routerApi;
