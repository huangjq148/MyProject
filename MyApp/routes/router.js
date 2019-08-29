/**
 * Created by Administrator on 2017/1/2 0002.
 */
var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
var user = require('./users/users')
var index = require('./index')
var login = require('./login')
var demos = require('./demos/demos')
var goodsInfo = require('./goodsManager/goodsInfo')
var tradeInfo = require('./goodsManager/tradeInfo')
var photo = require('./photo/photo')
var file = require('./file')
var article = require('./article')

router.use('/login', login)
/* GET home page. */
router.get('/*', function(req, res, next) {
    if(req.session.curUser == undefined){
        res.redirect('/login/toLogin');
    }
    next()
})


router.use('/index', index)
router.use('/user', user)
router.use('/demos', demos)
router.use('/goods', goodsInfo)
router.use('/trade', tradeInfo)
router.use('/photo', photo)
router.use('/file', file)
router.use('/article', article)

module.exports = router
