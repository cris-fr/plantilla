const router = require('express').Router();
const layout = require('../view/productView');
const productV1 = require('../version/productV1');


router.use("/v1", productV1);
router.use(layout);

module.exports = router;