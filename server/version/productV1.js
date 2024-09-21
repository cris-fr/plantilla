const controlerProduct = require('../controller/productController');
const express = require('express');
const file = require('../middleware/file')

const product = express();


product.get("/", controlerProduct.search)
product.post("/", file, controlerProduct.save);
product.put("/:id", express.json(), controlerProduct.update);
product.delete("/:id", controlerProduct.delete)

module.exports = product;