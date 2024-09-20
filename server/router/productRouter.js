const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { verify } = require('../middleware/verify');

const productV1 = require('../version/productV1');
const layout = require('../view/productView');

router.use("/v1", cookieParser(), verify, productV1);
router.use(layout);

module.exports = router;