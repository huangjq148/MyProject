/**
 * Created by Administrator on 2017/1/2 0002.
 */
let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let user = require('./users/users')
let account = require('./users/account')
let index = require('./index')
let login = require('./login')
let goodsInfo = require('./goodsManager/goodsInfo')
let tradeInfo = require('./goodsManager/tradeInfo')
let photo = require('./photo/photo')
let file = require('./file')
let article = require('./article')
let articleType = require('./article/type')
let { ResponseResult } = require('../utils')
const whiteList = ["/user/login"]

router.use('/login', login)
/* GET home page. */
router.all('/*', function(req, res, next) {
    if(whiteList.indexOf(req.url)>=0){
        next()
    }else if(req.session.curUser === undefined){
        res.send(ResponseResult.noLogin())
        return ;
    }else{
        next()
    }
})


router.use('/index', index)
router.use('/user', user)
router.use('/account', account)
router.use('/goods', goodsInfo)
router.use('/trade', tradeInfo)
router.use('/photo', photo)
router.use('/file', file)
router.use('/articles/type', articleType)
router.use('/articles', article)

module.exports = router
