const controlerProduct = require('../controller/productController');
const express = require('express');
const product = express();

product.post("/", express.json(), controlerProduct.save);
product.get("/", controlerProduct.search)
//product.delete("/:id", controlerProduct.delete)
//product.update("/:id", express.json(), controlerProduct.update);

module.exports = product;