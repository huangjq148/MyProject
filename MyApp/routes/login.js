/**
 * Created by Administrator on 2017/9/17 0017.
 */
var express = require('express');
var router = express.Router();
var utils = require("../utils/Utils");
var query = require("../utils/DbUtils.js");

/* GET home page. */
router.get('/toLogin', function (req, res, next) {
    res.sendfile('views/login.html');
});

router.post('/login', function (req, res, next) {
    var username = utils.getParameter("username", req);
    var password = utils.getParameter("password", req);
    var sql = "select * from user where username=? and password=?";

    query(sql, [username, password], function (qerr, vals, fields) {
        if (vals.length > 0) {
            req.session.currentUser = {
                id: vals[0].id,
                username: vals[0].username,
                password: vals[0].password
            };
            res.redirect('/index');
        } else {
            res.redirect('/login/toLogin');
        }

    })


    // res.sendfile('views/login.html');
});

module.exports = router;
