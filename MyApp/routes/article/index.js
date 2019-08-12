/**
 *   @Author huangjq
 *   @createDate 2019/8/12
 */
var express = require('express');
var router = express.Router();
let {Utils, DbUtilsClass, ResponseResult} = require('../commons')
const DbUtils = new DbUtilsClass('t_article')

router.post('/list', function(req, res, next) {
	DbUtils.queryPage(req.body).then(result => {
		res.end(ResponseResult.success(result))
	})
})

module.exports = router;
