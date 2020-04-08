/**
 * Created by Administrator on 2017/1/2 0002.
 */
let express = require('express')
let router = express.Router()
let bodyParser = require('body-parser')
let user = require('./users/users')
let index = require('./index')
let login = require('./login')
let goodsInfo = require('./goodsManager/goodsInfo')
let tradeInfo = require('./goodsManager/tradeInfo')
let photo = require('./photo/photo')
let file = require('./file')
let article = require('./article')
let articleType = require('./article/type')

router.use('/login', login)
/* GET home page. */
// router.get('/*', function(req, res, next) {
//     if(req.session.curUser == undefined){
//         res.redirect('/login/toLogin');
//     }
//     next()
// })


router.use('/index', index)
router.use('/user', user)
router.use('/goods', goodsInfo)
router.use('/trade', tradeInfo)
router.use('/photo', photo)
router.use('/file', file)
router.use('/article', article)
router.use('/articleType', articleType)

module.exports = router
