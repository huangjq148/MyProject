/**
 *   @Author huangjq
 *   @createDate 2019/8/12
 */
const express = require('express')
const router = express.Router()
let { Utils, DbUtilsClass, ResponseResult } = require('../../utils')
const DbUtils = new DbUtilsClass('t_article_type')
let article = {
    id: '',
    name: '',
    photoPath: '',
    description: ''
}

router.all('/*', function(req, res, next) {
    DbUtils.req = req
    next()
})

router.post('/list', function(req, res, next) {
    DbUtils.queryPage({ ...req.body, sort: { key: 'sortNo', value: 'asc' } }).then(result => {
        res.end(ResponseResult.success(result))
    })
})

router.get('/:id', function(req, res, next) {
    DbUtils.queryObj({ id: req.params.id }).then(result => {
        res.end(ResponseResult.success(result))
    })
})

router.delete('/:id', function(req, res) {
    DbUtils.delete({ id: req.params.id }).then(function() {
        res.send(ResponseResult.success({}))
    })
})

router.post('/', function(req, res) {
    Utils.copyValue(article, req.body)
    DbUtils.insert(article).then(function() {
        res.send(ResponseResult.success({}))
    })
})

router.put('/sort/:id/:isUp', async function(req, res) {
    const { id, isUp } = req.params
    const oldObj = await DbUtils.queryObj({ id })
    let sortNo = oldObj.sortNo
    let newSortNo = isUp === '0'? sortNo+1: sortNo-1
    console.log('oldSortNo', sortNo,isUp)
    let sql1 = `update t_article_type set sortNo=sortNo${isUp === '0'? '+':'-' }1 where id='${id}'`
    let sql2 = `update t_article_type set sortNo=sortNo${isUp === '0'? '-':'+' }1 where sortNo=${newSortNo} and id!='${id}'`
    await DbUtils.query(sql1)
    await DbUtils.query(sql2)
    res.send(ResponseResult.success({}))
})

router.put('/', function(req, res) {
    Utils.copyValue(article, req.body)
    DbUtils.update(article, { id: article.id }).then(function() {
        res.send(ResponseResult.success({}))
    })
})


module.exports = router
