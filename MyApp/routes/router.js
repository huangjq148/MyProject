/**
 * Created by Administrator on 2017/1/2 0002.
 */
var express = require('express')
var router = express.Router()
var user = require('./users/users')
var index = require('./index')
var login = require('./login')
var demos = require('./demos/demos')
var goodsInfo = require('./goodsManager/goodsInfo')
var tradeInfo = require('./goodsManager/tradeInfo')
var photo = require('./photo/photo')
var bodyParser = require('body-parser')
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var fs = require('fs')
var UUID = require('node-uuid')
var DbUtils = require('./commons/DbUtils')

router.use('/login', login)
/* GET home page. */
router.get('/*', function(req, res, next) {
    // if(req.session.currentUser == undefined){
    //     res.redirect('/login/toLogin');
    // }
    next()
})

router.post('/file/upload', multipartMiddleware, function(req, res, next) {
    console.log(req.files.file.name) // 上传的文件信息
    var file = req.files.file
    var originalFilename = file.originalFilename
    var suffix = originalFilename.substr(originalFilename.lastIndexOf('.'))
    var fileRealName = UUID.v4().replace(/-/g, '') + suffix

    var des_file = './upload/' + fileRealName
    fs.readFile(file.path, function(err, data) {
        fs.writeFile(des_file, data, function(err) {
            if (err) {
                console.log(err)
            } else {
                response = {
                    message: 'File uploaded successfully',
                    filename: {
                        originalName: file.name,
                        realName: fileRealName
                    }
                }
                console.log(response)
                res.end(JSON.stringify(response))
            }
        })
    })
})

//http://localhost:3000/file-download?originalName=hh.png&realName=e881c02f2a3449c1b2b58824d17cb61a
router.get('/file/download', function(req, res, next) {
    var originalName = req.param('originalName')
    var realName = req.param('realName')
    var filePath = './upload/' + realName
    fs.readFile(filePath, function(isErr, data) {
        if (isErr) {
            res.end('Read file failed!')
            return
        }
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
            'Content-Disposition': 'attachment; filename=' + originalName //告诉浏览器这是一个需要下载的文件
        })
        res.end(data)
    })
})
router.post('/file/delete/:id', function(req, res, next) {
    DbUtils.delete({ id: req.params.id }, 't_upload_file')
        .then(function() {
            res.end('success')
            console.log(`删除${req.params.id}`)
        })
        .catch(() => {
            res.end('删除失败')
        })
})

router.use('/index', index)
router.use('/users', user)
router.use('/demos', demos)
router.use('/goods', goodsInfo)
router.use('/trade', tradeInfo)
router.use('/photo', photo)

module.exports = router
