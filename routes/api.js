var express = require('express');
var router = express.Router();
var imgUToken = require('./token/imgUToken');

router.use('/imgUToken', imgUToken);

module.exports = router;