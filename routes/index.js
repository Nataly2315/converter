let express = require('express');
let router = express.Router();

let controller = require('../controllers/converter');

router.post('/convert', controller.validate, controller.convert);

module.exports = router;
