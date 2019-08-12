var express = require('express');
var router = express.Router();
// var DBUtils = require('../../utils/DBUtils');
let {Utils, DbUtilsClass, ResponseResult} = require('../commons')
const DbUtils = new DbUtilsClass('t_user')
/* GET users listing. */
router.post('/login', function (req, res, next) {
	let queryParams = {
		username: req.body.username,
		password: req.body.password
	}
	DbUtils.queryObj(queryParams).then(function (result) {
		DbUtils.queryObj({userId: result.id}, "t_user_info").then(function (userInfo) {
			req.session.curUser = {
				id: result.id,
				name: userInfo.name,
				sex: userInfo.sex,
				avatar: userInfo.avatar
			}
			res.send(ResponseResult.success(result));
		})
	});
	
});

router.get('/info', function (req, res, next) {
	res.send(ResponseResult.success(req.session.curUser));
});

router.get('/login', function (req, res, next) {
	res.send('login');
});

router.post('/logout', function (req, res, next) {
	req.session.curUser = {}
	res.send(ResponseResult.success('logout'));
});

module.exports = router;
