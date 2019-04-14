/**
 * Created by Administrator on 2017/9/5 0005.
 */
var express = require('express')
var UUID = require('uuid')
var router = express.Router()
var query = require('../commons/db.js')
var utils = require('../commons/utils.js')
let { Utils, DbUtilsClass, ResponseResult } = require('../commons')
// var query = require('../commons/db.js')
const DbUtils = new DbUtilsClass('t_goods')

var tradeInfo = new Object()
tradeInfo.id = ''
tradeInfo.shangpinid = ''
tradeInfo.pinming = ''
tradeInfo.shuliang = ''
tradeInfo.jiage = ''
tradeInfo.type = ''
tradeInfo.riqi = ''
tradeInfo.remark = ''

router.get('/edit', function(req, res, next) {
    var id = req.param('id')
    var sql = 'select t.*,g.pinming from tradeRecord t left join goods g on g.id=t.shangpinId where t.id=?'
    if (id != '' && id != undefined) {
        query(sql, id, function(qerr, vals, fields) {
            res.render('goodsManager/new/jinhuo', vals[0])
        })
    } else {
        res.render('goodsManager/new/jinhuo', tradeInfo)
    }
})

router.get('/chuhuoView', function(req, res, next) {
    res.render('goodsManager/new/chuhuo', tradeInfo)
})

router.get('/jinhuoList', function(req, res, next) {
    var id = req.param('id')
    // var sql = 'select * from t_purchase_record t where goodsId="' + id + '"';

    var sql =
        'select a.*,(a.number-ifnull(b.totalSellNumber,0)) nowNumber,0 as sellPrice,0 as sellNumber  ' +
        'from t_purchase_record a LEFT JOIN (select purchaseId,sum(sellNumber) totalSellNumber from t_sell_record where goodsId=' +
        id +
        ' GROUP BY purchaseId) b ' +
        'on a.id=b.purchaseId ' +
        'where a.goodsId=' +
        id

    if (id != '' && id != undefined) {
        query(sql, id, function(qerr, vals, fields) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(vals))
        })
    } else {
        res.render('goodsManager/new/chuhuo', tradeInfo)
    }
})

router.get('/list-bak', function(req, res, next) {
    var page = req.param('page')
    var limit = req.param('limit')
    var searchShangpinid = req.param('searchShangpinid')
    var searchType = req.param('searchType')
    var searchStartDate = req.param('searchStartDate')
    var searchEndDate = req.param('searchEndDate')
    var userId = req.session.currentUser.id
    var sql =
        'select t.*,g.pinming,g.jinjia,g.guige from tradeRecord t left join goods g on g.id=t.shangpinId where 1=1 '
    var params = [userId]

    sql += 'and g.belongUser=? '
    if (searchShangpinid != '' && searchShangpinid != undefined) {
        sql += 'and shangpinid = ' + searchShangpinid + ' '
    }
    if (searchType != '' && searchType != undefined && searchType != 0) {
        sql += "and type = '" + searchType + "'"
    }
    if (searchStartDate != '' && searchStartDate != undefined) {
        sql += "and riqi >= '" + searchStartDate + "'"
    }
    if (searchEndDate != '' && searchEndDate != undefined) {
        sql += "and riqi <= '" + searchEndDate + "'"
    }

    sql += ' order by id desc'
    sql += ' limit ' + (page - 1) * limit + ',' + limit + ''

    query(sql, params, function(qerr, vals, fields) {
        var sql1 = 'select count(1) as count,belongUser from traderecord where belongUser=? group by belongUser'
        query(sql1, params, function(qerr1, vals1, fields) {
            var obj = {}
            obj.code = 0
            obj.msg = ''
            obj.count = 0
            if (vals1.length > 0) {
                obj.count = vals1[0].count
            }

            for (var item in vals) {
                vals[item]['jine'] = (vals[item]['shuliang'] * vals[item]['jiage']).toFixed(2)
                vals[item]['maoli'] = ((vals[item]['jiage'] - vals[item]['jinjia']) * vals[item]['shuliang']).toFixed(2)
                vals[item]['maolilv'] = ((vals[item]['jiage'] - vals[item]['jinjia']) / vals[item]['jiage']).toFixed(2)
            }

            obj.data = vals

            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(obj))
        })
    })
})

router.post('/list', function(req, res, next) {
    DbUtils.queryList(req.body, 'vw_trade_record_detail').then(result => {
        res.end(JSON.stringify(result))
    })
    // var page = req.param('page')
    // var size = req.param('size')
    // var pinming = req.param('input4Search')
    // var searchType = req.param('searchType')
    // var searchStartDate = req.param('startDate')
    // var searchEndDate = req.param('endDate')
    // var userId = req.param('userId')
    // // var userId = req.session.currentUser.id;
    // var sql = 'select * from vw_trade_record_detail g where 1=1 and g.belongUserId=? '
    // var params = [userId]
    // var conditionStr = ''
    //
    // if (pinming != '' && pinming != undefined) {
    //     conditionStr += " and pinming like '%" + pinming + "%'"
    // }
    // if (searchType != '' && searchType != undefined && searchType != '全部') {
    //     conditionStr += " and type = '" + searchType + "'"
    // }
    // if (searchStartDate != '' && searchStartDate != undefined) {
    //     conditionStr += " and date >= '" + searchStartDate + "'"
    // }
    // if (searchEndDate != '' && searchEndDate != undefined) {
    //     conditionStr += " and date <= '" + searchEndDate + "'"
    // }
    //
    // sql += conditionStr
    // sql += ' order by date desc'
    // if (page != null && page != undefined && size != null && size != undefined) {
    //     sql += ' limit ' + (page - 1) * page + ',' + size + ''
    // }
    // //
    //
    // query(sql, params, function(qerr, vals, fields) {
    //     var sql1 = 'select count(1) as count,belongUserId from vw_trade_record where belongUserId=?' + conditionStr
    //     sql1 += ' group by belongUserId'
    //     query(sql1, params, function(qerr1, vals1, fields) {
    //         var obj = {}
    //         obj.code = 0
    //         obj.msg = ''
    //         obj.count = 0
    //         if (qerr1 == null && vals1.length > 0) {
    //             obj.count = vals1[0].count
    //         }
    //
    //         for (var item in vals) {
    //             vals[item]['jine'] = (vals[item]['number'] * vals[item]['sellPrice']).toFixed(2)
    //             if (vals[item]['type'] == '出货') {
    //                 vals[item]['maoli'] = (
    //                     (vals[item]['sellPrice'] - vals[item]['purPrice']) *
    //                     vals[item]['number']
    //                 ).toFixed(2)
    //                 vals[item]['maolilv'] = (
    //                     (vals[item]['sellPrice'] - vals[item]['purPrice']) /
    //                     vals[item]['sellPrice']
    //                 ).toFixed(2)
    //             } else {
    //                 vals[item]['maoli'] = 0
    //                 vals[item]['maolilv'] = 0
    //             }
    //         }
    //
    //         obj.data = vals
    //
    //         res.writeHead(200, { 'Content-Type': 'application/json' })
    //         res.end(JSON.stringify(obj))
    //     })
    // })
})

router.get('/countTradeRecord', function(req, res, next) {
    var userId = req.session.currentUser.id
    var id = req.param('id')
    var type = req.param('type')
    var searchStartDate = req.param('searchStartDate')
    var searchEndDate = req.param('searchEndDate')
    var param = [userId]
    var sql =
        'select type,sum(number*purPrice) as jinhuojine,sum(number*(purPrice)) as chengben,sum(number*sellPrice) as chushoujia from vw_trade_record_detail  ' +
        'where belongUserId=? '
    var orderSql = 'order by type desc '
    var groupBySql = ' GROUP BY type '
    var whereSql = ''

    if (id != '' && id != undefined) {
        whereSql += ' and goodsId=?'
        param.push(id)
    }
    if (searchStartDate != '' && searchStartDate != undefined) {
        whereSql += ' and date>=?'
        param.push(searchStartDate)
    }
    if (searchEndDate != '' && searchEndDate != undefined) {
        whereSql += ' and date<=?'
        param.push(searchEndDate)
    }

    sql += whereSql + groupBySql + orderSql
    query(sql, param, function(qerr, vals, fields) {
        if (qerr == null) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(vals))
        }
    })
})

router.post('/jinHuoSaveOrUpdate', function(req, res, next) {
    var id = req.body.id
    var shangpinid = req.body.shangpinid
    var shuliang = req.body.shuliang
    var jiage = req.body.jiage
    var riqi = req.body.riqi
    var remark = req.body.remark
    var sql = ''
    var params

    if (id == '' || id == undefined) {
        var userId = req.session.currentUser.id
        sql =
            "insert into t_purchase_record(id,goodsId,number,price,date,remark,belongUserId) values(REPLACE(UUID(),'-',''),?,?,?,?,?,?)"
        params = [shangpinid, shuliang, jiage, riqi, remark, userId]
    } else {
        sql = 'update t_purchase_record set goodsId=?,number=?,price=?,date=?,remark=? where id=?'
        params = [shangpinid, shuliang, jiage, riqi, remark, id]
    }
    query(sql, params, function(qerr, vals, fields) {
        if (qerr == null) {
            res.end('success')
        } else {
            console.log(qerr)
        }
    })
})
router.post('/chuHuoSaveOrUpdate', function(req, res, next) {
    var userId = req.param('userId')
    var id = req.body.id
    var data = req.body.data
    var goodsId = data.goodsId
    var purchaseId = data.id
    var price = data.price
    var date = req.body.date
    var remark = data.remark
    var sellNumber = data.sellNumber
    var sellPrice = data.sellPrice
    var sql = ''
    var params

    if (id == '' || id == undefined) {
        sql =
            "insert into t_sell_record(id,goodsId,purchaseId,price,date,sellNumber,sellPrice,remark,belongUserId) values(REPLACE(UUID(),'-',''),?,?,?,?,?,?,?,?)"
        params = [goodsId, purchaseId, price, date, sellNumber, sellPrice, remark, userId]
    } else {
        sql = 'update t_sell_record set goodsId=?,number=?,price=?,date=?,sellPrice=?,sellNumber=?,remark=? where id=?'
        params = [shangpinid, shuliang, jiage, riqi, sellPrice, sellNumber, remark, id]
    }
    query(sql, params, function(qerr, vals, fields) {
        if (qerr == null) {
            res.end('success')
        } else {
            console.log(qerr)
        }
    })
})

router.post('/remove', function(req, res, next) {
    var id = utils.getParameter('id', req)
    var type = utils.getParameter('type', req)
    var tableName = type == '进货' ? 't_purchase_record' : 't_sell_record'
    var sql = 'delete from ' + tableName + ' where id=?'

    var params = [id]
    query(sql, params, function(qerr, vals, fields) {
        if (qerr == null) {
            res.end('success')
        }
    })
})

router.get('/countSell', function(req, res, next) {
    var id = req.param('id')
    var type = req.param('type')
    var searchStartDate = req.param('searchStartDate')
    var searchEndDate = req.param('searchEndDate')
    var param = []
    var sql =
        'select sum(t.jiage*t.shuliang) jine,sum(g.jinjia*t.shuliang) chengben,type lirun from tradeRecord t left join goods g on g.id=t.shangpinId where 1=1'
    var orderSql = 'order by type desc '
    var groupBySql = ' GROUP BY type '
    var whereSql = ''

    if (id != '' && id != undefined) {
        whereSql += ' and g.id=?'
        param.push(id)
    }
    if (searchStartDate != '' && searchStartDate != undefined) {
        whereSql += ' and riqi>=?'
        param.push(searchStartDate)
    }
    if (searchEndDate != '' && searchEndDate != undefined) {
        whereSql += ' and riqi<=?'
        param.push(searchEndDate)
    }

    sql += whereSql + groupBySql + orderSql
    // var params = [id, type, id]
    query(sql, param, function(qerr, vals, fields) {
        if (qerr == null) {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(vals))
        }
    })
})

// res.writeHead(200, {'Content-Type': 'application/json'});
// res.end(JSON.stringify(vals));
// res.sendfile('views/goodsManager/tradeManager.html');

module.exports = router
