/**
 * Created by Administrator on 2017/8/20 0002.
 */
var express = require('express')
var router = express.Router()
var query = require('../commons/db.js')
const DbUtilsFn = require('../commons/DbUtils')
const DbUtils = DbUtilsFn('goods')

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

router.post('/saveOrUpdate', function(req, res, next) {
    var id = req.param('id')
    var danwei = req.param('danwei')
    var guige = req.param('guige')
    var pinming = req.param('pinming')
    var jinjia = req.param('jinjia')
    var remark = req.param('remark')
    var userId = req.param('userId')
    var sql = ''
    var params

    if (id == '' || id == undefined) {
        sql = 'insert into goods(pinming,danwei,guige,jinjia,remark,belongUser) values(?,?,?,?,?,?)'
        params = [pinming, danwei, guige, jinjia, remark, userId]
    } else {
        sql = 'update goods set pinming=?,danwei=?,guige=?,jinjia=?,remark=? where id=?'
        params = [pinming, danwei, guige, jinjia, remark, id]
    }
    query(sql, params, function(qerr, vals, fields) {
        if (qerr == null) {
            res.end('success')
        }
    })
})

router.post('/remove', function(req, res, next) {
    var id = req.body.id
    var sql = 'delete from goods where id=?'
    var params = [id]
    query(sql, params, function(qerr, vals, fields) {
        if (qerr == null) {
            res.end('success')
        }
    })
    // res.sendfile('views/demos/demo3.html');
})

router.get('/getPrice', function(req, res, next) {
    var id = req.param('id')
    var sql = 'select jinjia,belongUser from goods where id=?'
    var params = [id]
    query(sql, params, function(qerr, vals, fields) {
        if (qerr == null) {
            res.end(vals[0].jinjia + '')
        }
    })
    // res.sendfile('views/demos/demo3.html');
})

router.get('/getKucun', function(req, res, next) {
    var id = req.param('id')
    var sql = 'select kucun from vw_kucun where id=? and belongUser=?'
    var userId = req.param('userId')
    // var userId = req.session.currentUser.id;
    var params = [id, userId]
    if (id == null || id == undefined || id == '') {
        res.end('0')
    } else {
        query(sql, params, function(qerr, vals, fields) {
            if (qerr == null) {
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify(vals))
            }
        })
    }
})

router.get('/data', function(req, res, next) {
    var data =
        '[' +
        '{"id":"FI-SW-01","text":"Koi","unitcost":10.00,"status":"P","listprice":36.50,"attr1":"Large","itemid":"EST-1"},' +
        '{"id":"AV-CB-01","text":"Amazon Parrot","unitcost":92.00,"status":"P","listprice":63.50,"attr1":"Adult Male","itemid":"EST-18"}' +
        ']'
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(data)
})

module.exports = router
