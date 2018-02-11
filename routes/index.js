var express = require('express');
var router = express.Router();

//Sends to browser
router.get('/', function(req, res, next) {
   res.send('Hi');
});

module.exports = router;
