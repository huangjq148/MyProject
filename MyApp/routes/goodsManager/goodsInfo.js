/**
 * Created by Administrator on 2017/8/20 0002.
 */
var express = require('express')
var router = express.Router()
let { Utils, DbUtilsClass, ResponseResult } = require('../commons')
// var query = require('../commons/db.js')
const DbUtils = new DbUtilsClass('t_goods')

var goodsInfo = new Object()
goodsInfo.id = ''
goodsInfo.pinming = ''
goodsInfo.danwei = ''
goodsInfo.guige = ''
goodsInfo.jinjia = ''
goodsInfo.remark = ''

router.post('/list', function(req, res, next) {
    DbUtils.queryList(req.body, 'vw_goodsInfo').then(result => {
        res.end(JSON.stringify(result))
    })
})

router.get('/:id', function(req, res, next) {
    DbUtils.queryObj({ id: req.param('id') }).then(result => {
        res.end(JSON.stringify(result))
    })
})
router.post('/save', function(req, res, next) {
    Utils.copyValue(goodsInfo, req.body)
    DbUtils.insert(goodsInfo)
        .then(result => {
            res.end(ResponseResult.success())
        })
        .catch(err => {
            res.end(ResponseResult.fail())
        })
})
router.put('/', function(req, res, next) {
    Utils.copyValue(goodsInfo, req.body)
    DbUtils.update(goodsInfo, { id: goodsInfo.id }).then(result => {
        res.end(ResponseResult.success())
    })
})
router.delete('/:id', function(req, res, next) {
    DbUtils.delete({ id: req.param('id') }).then(result => {
        res.end(ResponseResult.success())
    })
})

// router.get('/getKucun', function(req, res, next) {
//     var id = req.param('id')
//     var sql = 'select kucun from vw_kucun where id=? and belongUser=?'
//     var userId = req.param('userId')
//     // var userId = req.session.currentUser.id;
//     var params = [id, userId]
//     if (id == null || id == undefined || id == '') {
//         res.end('0')
//     } else {
//         query(sql, params, function(qerr, vals, fields) {
//             if (qerr == null) {
//                 res.writeHead(200, { 'Content-Type': 'application/json' })
//                 res.end(JSON.stringify(vals))
//             }
//         })
//     }
// })

module.exports = router
