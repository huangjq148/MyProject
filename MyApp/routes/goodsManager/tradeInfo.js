/**
 * Created by Administrator on 2017/9/5 0005.
 */
var express = require('express')
var UUID = require('uuid')
var router = express.Router()
var utils = require('../../utils/Utils.js')
let { Utils, DbUtilsClass, ResponseResult } = require('../../utils')
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
 * 统计交易情况
 */
router.post("/statistics",function(req,res,next){
    let params = {}
    DbUtils.queryList(req.body, "vw_trade_info").then(resultList=>{
        let sellTotal = 0;
        let purTotal = 0;
        let profitTotal = 0;
        resultList.map(item=>{
            switch (item.type) {
                case "0":
                    purTotal += item.price * item.number
                    break;
                case "1":
                    sellTotal += item.price * item.number;
                    profitTotal += (item.price-item.cost) * item.number;
                    break;
            }
        })

        res.end(ResponseResult.success({
            sellTotal,purTotal,profitTotal
        }))
    })
})

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

/**
 * 删除交易记录
 */
router.delete('/:id', function(req, res, next) {
    let deleteTrade = async function(){
        let tradeInfo = await DbUtils.queryObj({ id: req.params.id });
        let goodsInfo = await DbUtils.queryObj({ id: tradeInfo.goodsId }, 't_goods');
        goodsInfo = handleStockChange(tradeInfo, goodsInfo, true)
        if (goodsInfo.stock < 0) {
           return ResponseResult.fail('库存不足')
        }
        await DbUtils.update(goodsInfo, { id: goodsInfo.id }, 't_goods');
        let deleteResult = await DbUtils.delete({ id: req.params.id })
        res.end(ResponseResult.success());
    }
    deleteTrade()

    // DbUtils.queryObj({ id: req.params.id }).then(tradeInfo => {
    //     DbUtils.queryObj({ id: tradeInfo.goodsId }, 't_goods').then(goodsInfo => {
    //         let tmpObj = JSON.parse(JSON.stringify(tradeInfo))
    //         goodsInfo = handleStockChange(tradeInfo, goodsInfo, true)
    //         if (goodsInfo.stock < 0) {
    //             res.end(ResponseResult.fail('库存不足'))
    //             return
    //         }
    //         DbUtils.update(goodsInfo, { id: goodsInfo.id }, 't_goods').then(res => {
    //             console.log('成功')
    //         })
    //         DbUtils.delete({ id: req.params.id }).then(result => {
    //             res.end(ResponseResult.success())
    //         })
    //     })
    // })
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


// res.writeHead(200, {'Content-Type': 'application/json'});
// res.end(JSON.stringify(vals));
// res.sendfile('views/goodsManager/tradeManager.html');

module.exports = router
