/**
 *   @Author huangjq
 *   @createDate 2019/8/12
 */
const express = require('express')
const router = express.Router()
let { Utils, DbUtilsClass, ResponseResult } = require('../../utils')
const DbUtils = new DbUtilsClass('t_role')
let role = {
    id: '',
    name: '',
    description: '',
    code: '',
    permissions: ''
}
router.all('/*', function(req, res, next) {
    DbUtils.req = req
    next()
})

router.post('/list', async function(req, res, next) {
    let result = await DbUtils.queryPage(req.body)
    res.json(ResponseResult.success(result))
})

router.get('/:id', async function(req, res, next) {
    let result = await DbUtils.queryObj({ id: req.params.id })
    res.json(ResponseResult.success(result))
})

router.delete('/:id', async function(req, res) {
    await DbUtils.delete({ id: req.params.id })
    res.json(ResponseResult.success({}))
})

router.post('/', async function(req, res) {
    Utils.copyValue(role, req.body)
    await DbUtils.insert(role)
    res.json(ResponseResult.success({}))
})

router.put('/', async function(req, res) {
    Utils.copyValue(role, req.body)
    await DbUtils.update(role, { id: role.id })
    res.json(ResponseResult.success({}))
})

module.exports = router
