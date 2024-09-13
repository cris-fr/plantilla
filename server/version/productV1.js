const controlerProduct = require('../controller/productController');
const express = require('express');
const product = express();

product.post("/", express.json(), controlerProduct.save);
product.get("/", controlerProduct.search)
product.put("/:id", express.json(), controlerProduct.update);
product.delete("/:id", controlerProduct.delete)

module.exports = product;