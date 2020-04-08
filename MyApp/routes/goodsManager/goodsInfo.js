/**
 * Created by Administrator on 2017/8/20 0002.
 */
var express = require('express')
var router = express.Router()
let { Utils, DbUtilsClass, ResponseResult } = require('../../utils')
const DbUtils = new DbUtilsClass('t_goods')

var goodsInfo = new Object()
goodsInfo.id = ''
goodsInfo.pinming = ''
goodsInfo.danwei = ''
goodsInfo.guige = ''
goodsInfo.jinjia = ''
goodsInfo.remark = ''

router.post('/list', function(req, res, next) {
    DbUtils.queryPage(req.body, 't_goods').then(result => {
        res.end(ResponseResult.success(result))
    })
})

router.get('/list', function(req, res, next) {
    DbUtils.queryPage(req.body, 'vw_goodsInfo').then(result => {
        res.end(ResponseResult.success(result))
    })
})

router.get('/:id', function(req, res, next) {
    DbUtils.queryObj({ id: req.param('id') }).then(result => {
        res.end(ResponseResult.success(result))
    })
})
router.post('/', function(req, res, next) {
    Utils.copyValue(goodsInfo, req.body)
    DbUtils.insert(goodsInfo)
        .then(result => {
            res.end(ResponseResult.success())
        })
        .catch(err => {
            res.end(ResponseResult.fail())
        })
})
router.delete('/:id', function(req, res, next) {
    DbUtils.delete({ id: req.param('id') }).then(result => {
        res.end(ResponseResult.success())
    })
})
router.put('/', function(req, res, next) {
    Utils.copyValue(goodsInfo, req.body)
    DbUtils.update(goodsInfo, { id: goodsInfo.id }).then(result => {
        res.end(ResponseResult.success())
    })
})



module.exports = router
