var express = require('express');
var router = express.Router();
var DBUtils = require('../../utils/DBUtils');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // DBUtils.init();
    DBUtils.query('',function(){
        res.send('respond with a resource');
    });
    // debugger;

});

router.get('/toLogin',function(req,res,next){

  res.send('toLogin');
});

router.get('/login',function(req,res,next){
  res.send('login');
});

router.get('/logout',function(req,res,next){
  res.send('logout');
});

module.exports = router;
