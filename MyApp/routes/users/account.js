var express = require('express');
var router = express.Router();
// var DBUtils = require('../../utils/DBUtils');
let {Utils, DbUtilsClass, ResponseResult} = require('../../utils')
const DbUtils = new DbUtilsClass('t_user_account')
let account = {
	id:"",
	username:"",
	password:"",
	status:"",
	roles: []
}

router.post('/list', async function (req, res, next) {
	let result = await DbUtils.queryPage(req.body)
	res.end(ResponseResult.success(result))
})

router.get('/:id', async function (req, res, next) {
	let result = await DbUtils.queryObj({id: req.params.id})
	res.end(ResponseResult.success(result))
})

router.delete("/:id", async function (req, res) {
	await DbUtils.delete({id:req.params.id})
	res.send(ResponseResult.success({}))
})

router.post("/", async function (req, res) {
	Utils.copyValue(account, req.body)
	await DbUtils.insert(account)
	res.send(ResponseResult.success({}))
})

router.put("/", async function (req, res) {
	Utils.copyValue(account, req.body)
	await DbUtils.update(account,{id:account.id})
	res.send(ResponseResult.success({}))
})

module.exports = router;
