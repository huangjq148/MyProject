/**
 *   @Author huangjq
 *   @createDate 2019/8/12
 */
var express = require('express');
var router = express.Router();
let {Utils, DbUtilsClass, ResponseResult} = require('../commons')
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

router.post('/list', function (req, res, next) {
	DbUtils.queryPage(req.body).then(result => {
		res.end(ResponseResult.success(result))
	})
})

router.get('/:id', function (req, res, next) {
	DbUtils.queryObj({id: req.params.id}).then(result => {
		res.end(ResponseResult.success(result))
	})
})

router.delete("/:id", function (req, res) {
	DbUtils.delete({id:req.params.id}).then(function () {
		res.send(ResponseResult.success({}))
	})
})

router.post("/", function (req, res) {
	Utils.copyValue(article, req.body)
	DbUtils.insert(article).then(function () {
		res.send(ResponseResult.success({}))
	})
})

router.put("/", function (req, res) {
	Utils.copyValue(article, req.body)
	DbUtils.update(article,{id:article.id}).then(function () {
		res.send(ResponseResult.success({}))
	})
})

module.exports = router;
