/**
 *   @Author huangjq
 *   @createDate 2019/8/11
 */
var express = require('express')
var router = express.Router()
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()
var fs = require('fs')
var UUID = require('node-uuid')
let {Utils, DbUtilsClass, ResponseResult} = require('../commons')
let DbUtils = new DbUtilsClass('t_upload_file')

router.post('/upload', multipartMiddleware, function (req, res, next) {
	console.log(req.files.file.name) // 上传的文件信息
	var file = req.files.file
	var originalFilename = file.originalFilename
	var suffix = originalFilename.substr(originalFilename.lastIndexOf('.'))
	var fileRealName = UUID.v4().replace(/-/g, '') + suffix
	
	var des_file = './upload/' + fileRealName
	fs.readFile(file.path, function (err, data) {
		fs.writeFile(des_file, data, function (err) {
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
router.get('/download', function (req, res, next) {
	var originalName = req.param('originalName')
	var realName = req.param('realName')
	var filePath = './upload/' + realName
	fs.readFile(filePath, function (isErr, data) {
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
router.post('/delete/:id', function (req, res, next) {
	DbUtils;
	DbUtils.queryObj({id: req.params.id}, 't_upload_file').then(result => {
		return DbUtils.delete({id: req.params.id}, 't_upload_file')
			.then(function (result1) {
				fs.unlink(`./upload/${result.realName}`,function(error){
					if(error){
						console.log(error);
						return false;
					}
					res.end(ResponseResult.success())
				})
			})
	})
		.catch(() => {
			res.end(ResponseResult.fail())
		})
})

module.exports = router
