const bcrypt = require('bcrypt');  

exports.login = async (req, res) => {
    res.cookie('prueba', {name: 'asdasd'}, {maxAge: 1000000}).status(201).json({message: 'Cookie creada'});
}

exports.findcookie = async (req, res) => {
    console.log(req.cookies);

    res.json({message: 'ok'});
};

