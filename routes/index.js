const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, ignore) {
    res.status(200).json({message: 'Connection established, token verified'});
});

module.exports = router;
