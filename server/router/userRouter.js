const router = require('express').Router();
const { join } = require('path');
const userV1 = require('../version/userV1');

router.use("/v1", userV1);
router.get("/", (req, res)=>{
    res.sendFile(join(req.__dirname, process.env.EXPRESS_STATIC, '/views/home.html'));
})


module.exports = router;