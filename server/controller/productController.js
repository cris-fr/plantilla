const Product = require('../model/productModel');

exports.save = async (req, res) => {
    try {
        const product = new Product(req.data);
        let resUpload = await product.uploadFileByProduct(req.files, req.__dirname);
        if(!resUpload.status == 201) return resUpload.status(406).json({message: "The file could not be uploaded"});
        //req.body.image = resUpload.data;
        let {name: imagen} = req.files.product_image;
        let {data: imagenPath}=resUpload;
        let {name, brand, description} = req.body;
        
        let resProduct = await product.insertCollection({name, brand, description, imagen});
        if(resProduct.status == 201) return res.status(resProduct.status).json(resProduct);
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}

exports.search = async (req, res) => {
    try {
        const product = new Product(req.data);
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
        const product = new Product(req.data);
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
        const product = new Product(req.data);
        let data = await product.updateAndInsertCollection(req.params.id, req.body);
        res.status(214).json({status: 214, data});
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);

        return error;
    }
}

