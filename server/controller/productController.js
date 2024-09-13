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

exports.search = async (req, res) => {
    try {
        let data = await product.findCollection();
        res.status(200).json({status: 200, data});
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);

        return error;
    }
}

exports.delete = async (req, res) => {
    try {
        let data = await product.deleteByIdCollection(req.params.id);
        res.status(204).json({status: 204, data});
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);

        return error;
    }
}


exports.update = async (req, res) => {
    try {
        let data = await product.updateAndInsertCollection(req.params.id, req.body);
        res.status(214).json({status: 214, data});
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);

        return error;
    }
}

