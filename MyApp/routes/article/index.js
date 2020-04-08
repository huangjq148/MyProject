/**
 *   @Author huangjq
 *   @createDate 2019/8/12
 */
var express = require('express');
var router = express.Router();
let {Utils, DbUtilsClass, ResponseResult} = require('../../utils')
const DbUtils = new DbUtilsClass('t_article')
let article = {
	id:"",
	title:"",
	type:"",
	content:"",
	clickCount: 0
}
router.all("*", function(req, res, next){
	DbUtils.curUser = req.session.curUser
	next()
})

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
	Utils.copyValue(article, req.body)
	await DbUtils.insert(article)
	res.send(ResponseResult.success({}))
})

router.put("/", async function (req, res) {
	Utils.copyValue(article, req.body)
	await DbUtils.update(article,{id:article.id})
	res.send(ResponseResult.success({}))
})

module.exports = router;
