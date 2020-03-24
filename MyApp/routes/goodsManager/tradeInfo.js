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
const DbUtils = new DbUtilsClass('t_trade_record')

let tradeInfo = {
    id: '',
    goodsId: '',
    type: '', //0进货，1出货
    number: '',
    price: '',
    tradeDate: '',
    remark: ''
}

/**
 * 保存交易记录
 */
router.post('/', function(req, res, next) {
    Utils.copyValue(tradeInfo, req.body)
    DbUtils.queryObj({ id: tradeInfo.goodsId }, 't_goods').then(goodsInfo => {
        goodsInfo = handleStockChange(tradeInfo, goodsInfo)
        if (goodsInfo.stock < 0) {
            res.end(ResponseResult.fail('库存不足'))
            return
        }
        DbUtils.update(goodsInfo, { id: goodsInfo.id }, 't_goods').then(res => {
            console.log('成功')
        })

        DbUtils.insert(tradeInfo).then(result2 => {
            res.end(ResponseResult.success())
        })
            .catch(err => {
                res.end(ResponseResult.fail())
            })
    })
})

/**
 * 获取交易记录列表
 */
router.post('/list', function(req, res, next) {
    DbUtils.queryPage(req.body,"vw_trade_info").then(result => {
        res.end(ResponseResult.success(result))
    })
})

/**
 * 根据id获取交易记录
 */
router.get('/:id', function(req, res, next) {
    DbUtils.queryObj({ id: req.params.id }).then(result => {
        res.end(ResponseResult.success(result))
    })
})

/**
 * 修改交易记录
 */
router.put('/', function(req, res, next) {
    Utils.copyValue(tradeInfo, req.body)
    DbUtils.update(tradeInfo, { id: tradeInfo.id }).then(result => {
        res.end(ResponseResult.success())
    })
})

router.delete('/:id', function(req, res, next) {
    DbUtils.queryObj({ id: req.params.id }).then(tradeInfo => {
        DbUtils.queryObj({ id: tradeInfo.goodsId }, 't_goods').then(goodsInfo => {
            let tmpObj = JSON.parse(JSON.stringify(tradeInfo))
            goodsInfo = handleStockChange(tradeInfo, goodsInfo, true)
            if (goodsInfo.stock < 0) {
                res.end(ResponseResult.fail('库存不足'))
                return
            }
            DbUtils.update(goodsInfo, { id: goodsInfo.id }, 't_goods').then(res => {
                console.log('成功')
            })
            DbUtils.delete({ id: req.params.id }).then(result => {
                res.end(ResponseResult.success())
            })
        })
    })

})

/**
 * 0进货，1出货
 * @param tradeInfo
 * @param goodsInfo
 */
let handleStockChange = function(tradeInfo, goodsInfo, isDelete) {
    //如果是删除操作，原来是进货现在就需要减少库存，进行相反的操作
    if(isDelete){
        if(tradeInfo.type == 1){
            tradeInfo.price = tradeInfo.cost
            tradeInfo.type = 0
        }else{
            tradeInfo.type =1
        }
    }
    if (tradeInfo.type == 1) {
        //出货
        tradeInfo.cost = goodsInfo.totalMoney/goodsInfo.stock
        return subStock(tradeInfo, goodsInfo, isDelete)
    } else {
        //进货
        return addStock(tradeInfo, goodsInfo)
    }
}

/**
 * 进货，添加库存
 */
let addStock = function(tradeInfo, goodsInfo) {
    goodsInfo.stock += tradeInfo.number
    goodsInfo.totalMoney += tradeInfo.price * tradeInfo.number
    return goodsInfo
}

/**
 * 出货，减少库存
 * @param tradeInfo
 * @param goodsInfo
 */
let subStock = function(tradeInfo, goodsInfo, isDelete) {
    if(isDelete){
        goodsInfo.totalMoney -= tradeInfo.price * tradeInfo.number
    }else{
        goodsInfo.totalMoney -= (goodsInfo.totalMoney / goodsInfo.stock) * tradeInfo.number
    }
    goodsInfo.stock -= tradeInfo.number
    return goodsInfo
}

router.get('/purchase/list', function(req, res, next) {
    var id = req.param('id')
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
            res.end(ResponseResult.success(vals))
        })
    } else {
        res.render('goodsManager/new/chuhuo', tradeInfo)
    }
})


router.post('/count', function(req, res, next) {
    let waitPool = []
    let countSellSql = 'select sum(sellNumber*sellPrice) totalSell, sum((sellPrice-price)*sellNumber) profit from t_sell_record where 1=1 '
    let countPurSql = 'select sum(price*number) totalPurchase from t_purchase_record where 1=1 '
    let params = []
    let whereMapSql = DbUtils.generateWhereSql(req.body.whereMap, '', params)
    countSellSql += whereMapSql
    countPurSql += whereMapSql
    waitPool.push(DbUtils.query(countSellSql, params))
    waitPool.push(DbUtils.query(countPurSql, params))

    Promise.all(waitPool).then(result => {
        let data = {
            totalSell: result[0][0].totalSell || 0,
            profit: result[0][0].profit || 0,
            totalPurchase: result[1][0].totalPurchase || 0
        }
        res.end(ResponseResult.success(data))
    })
})
router.get('/countTradeRecord', function(req, res, next) {
    // var userId = req.session.currentUser.id
    var id = req.param('id')
    var type = req.param('type')
    var searchStartDate = req.param('searchStartDate')
    var searchEndDate = req.param('searchEndDate')
    // var param = [userId]
    var sql =
        'select type,sum(number*purPrice) as jinhuojine,sum(number*(purPrice)) as chengben,sum(number*sellPrice) as chushoujia from vw_trade_record_detail  '
    // + where belongUserId=? '
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

router.post('/purchase', function(req, res, next) {
    DbUtils.insert(req.body, 't_purchase_record').then(() => {
        res.end(ResponseResult.success())
    })
})
router.post('/sell', function(req, res, next) {
    let waitPool = []
    req.body.sellList.map(item => {
        if (item.sellNumber && item.sellNumber > 0) {
            let newTradeInfo = {}
            newTradeInfo.purchaseId = item.id
            newTradeInfo.goodsId = req.body.goodsId
            newTradeInfo.date = req.body.date
            newTradeInfo.price = item.price
            newTradeInfo.sellNumber = item.sellNumber
            newTradeInfo.sellPrice = item.sellPrice
            newTradeInfo.remark = item.remark

            let waitId = DbUtils.insert(newTradeInfo, 't_sell_record')
            waitPool.push(waitId)
        }
    })

    Promise.all(waitPool).then(() => {
        res.end(ResponseResult.success())
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
