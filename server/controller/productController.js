const Product = require('../model/productModel');

const product = new Product();

exports.save = async (req, res) => {
    try {
        let data = await product.insertCollection(req.body);
        res.status(201).json({status: 201, data});
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);

        return error;
    }
}

