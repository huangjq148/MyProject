/**
 * Created by Administrator on 2017/1/2 0002.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/demo1', function(req, res, next) {
    res.sendfile('views/demos/demo1.html');
});
router.get('/demo2', function(req, res, next) {
    res.sendfile('views/demos/demo2.html');
});
router.get('/demo3', function(req, res, next) {
    res.sendfile('views/demos/demo3.html');
});

module.exports = router;
