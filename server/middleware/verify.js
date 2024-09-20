exports.verify = async(req, res, next) => {
    try {
        let {nick, pwd, rol} = JSON.parse(req.cookie.token).data;
        req.data = {
            nick,
            pwd,
            rol
        }
        next();
    } catch (error) {
        res.status(401).json({status: 401, message: "You cannot access the requested view", error: error})}
};
