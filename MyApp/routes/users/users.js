var express = require('express')
var router = express.Router()
let { Utils, DbUtilsClass, ResponseResult } = require('../../utils')
const DbUtils = new DbUtilsClass('t_user')
const ACCOUNT_TABLE_NAME = 't_user_account'
let userInfo = {
    id: '',
    name: '',
    sex: '',
    avatar: ''
}
router.all('/*', function(req, res, next) {
    DbUtils.req = req
    Utils.copyValue(userInfo, req.body)
    next()
})

/* GET users listing. */
router.post('/login', async function(req, res, next) {
    let queryParams = {
        username: req.body.username,
        password: req.body.password
    }
    let accountInfo = await DbUtils.queryObj(queryParams, 't_user_account')
    if (accountInfo.id) {
        let userInfo = await DbUtils.queryObj({ id: accountInfo.userId })
        req.session.curUser = {
            id: accountInfo.id,
            userId: userInfo.id,
            username: accountInfo.username,
            name: userInfo.name,
            sex: userInfo.sex,
            avatar: userInfo.avatar
        }
        res.send(ResponseResult.success(userInfo))
    } else {
        res.send(ResponseResult.fail(accountInfo))
    }
})

router.get('/logout', function(req, res, next) {
    delete req.session.curUser
    res.send(ResponseResult.success('logout'))
})

router.get('/info', async function(req, res, next) {
    let userInfo = await DbUtils.queryObj({ id: req.session.curUser.userId })
    res.end(ResponseResult.success(userInfo))
})


router.post('/list', async function(req, res, next) {
    let result = await DbUtils.queryPage(req.body)
    res.end(ResponseResult.success(result))
})

router.get('/:id', async function(req, res, next) {
    let result = await DbUtils.queryObj({ id: req.params.id })
    res.end(ResponseResult.success(result))
})

router.delete('/:id', async function(req, res) {
    await DbUtils.delete({ id: req.params.id })
    await DbUtils.delete({ userId: req.params.id }, ACCOUNT_TABLE_NAME)
    res.send(ResponseResult.success({}))
})

router.post('/', async function(req, res) {
    let result = await DbUtils.insert(userInfo)
    await DbUtils.insert({
        userId: result.dataObj.id,
        username: req.body.username,
        password: '000000',
        status: '0'
    }, ACCOUNT_TABLE_NAME)
    res.send(ResponseResult.success({}))
})

router.put('/', async function(req, res) {
    Utils.copyValue(userInfo, req.body)
    await DbUtils.update(userInfo, { id: userInfo.id })
    res.send(ResponseResult.success({}))
})

module.exports = router
