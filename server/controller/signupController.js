const User = require('../model/signupModel');
const bcrypt = require('bcrypt');

const user = new User();

exports.createUser = async (req, res) => {
    try {
        let {nick, email, password} = req.body;
        let userExist = await user.findExistNick(nick);
        if(userExist.status == 200) return res.status(401).json({status: 401, message: "User already exists"})
        let emailExists = await user.findExistEmail(email);
        if(emailExists.status == 200) return res.status(401).json({status: 401, message: "User already exists"}) 
        if(req.body.password !== req.body.confirm) return res.status(401).json({status: 401, message: "The passwords do not match."})
        password = await bcrypt.hash(password, 12);
        let resUser = await user.insertCollection({nick, email, password, rol:"user standard"});
        let resCreatedUser = undefined;
        password = password.replace(/[^\w\s]|_/g, '');
        if(resUser.status == 201 ) resCreatedUser = await user.createUser(nick, password);
        if(resCreatedUser.status == 201) return res.status(resUser.status).json(resUser);
        res.status(resCreatedUser.status).json(resCreatedUser);
    } catch (error) {
        let err = JSON.parse(error.message);
        if(err.status == 500) return res.status(err.status).json(err);
    }
}



