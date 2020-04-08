var express = require('express');
var router = express.Router();
// var DBUtils = require('../../utils/DBUtils');
let {Utils, DbUtilsClass, ResponseResult} = require('../../utils')
const DbUtils = new DbUtilsClass('t_user')
/* GET users listing. */
router.post('/login', function (req, res, next) {
	let queryParams = {
		username: req.body.username,
		password: req.body.password
	}
	DbUtils.queryObj(queryParams,"t_user_account").then(function (result) {
		DbUtils.queryObj({userId: result.id}).then(function (userInfo) {
			req.session.curUser = {
				id: result.id,
				username: result.username,
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

router.post("/list", function (req, res, next) {
	DbUtils.queryPage(req.body).then(result => {
		res.end(ResponseResult.success(result))
	})
})
router.post("/account/list", function (req, res, next) {
	DbUtils.queryPage(req.body,"t_user_account").then(result => {
		res.end(ResponseResult.success(result))
	}).catch(reason => {
		debugger;
	})
})

router.post('/logout', function (req, res, next) {
	req.session.curUser = {}
	res.send(ResponseResult.success('logout'));
});

module.exports = router;
