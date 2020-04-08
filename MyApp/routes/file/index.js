/**
 *   @Author huangjq
 *   @createDate 2019/8/11
 */
const express = require('express')
const router = express.Router()
const multipart = require('connect-multiparty')
const multipartMiddleware = multipart()
const fs = require('fs')
const UUID = require('node-uuid')
let { Utils, DbUtilsClass, ResponseResult } = require('../../utils')
let DbUtils = new DbUtilsClass('t_upload_file')
let { checkDir } = require(global.basePath + '/utils/fileUtils')

//http://localhost:3000/file/upload
router.post('/upload', multipartMiddleware, async function(req, res, next) {
    console.log(req.files.file.name) // 上传的文件信息
    const file = req.files.file
    const originalFilename = file.originalFilename
    const suffix = originalFilename.substr(originalFilename.lastIndexOf('.'))
    const fileRealName = UUID.v4().replace(/-/g, '') + suffix

    const des_file = './upload/' + fileRealName

    await checkDir('upload')

    fs.readFile(file.path, function(err, data) {
        fs.writeFile(des_file, data, function(err) {
            if (err) {
                console.error(err)
            } else {
                const response = {
                    message: 'File uploaded successfully',
                    filename: {
                        originalName: file.name,
                        realName: fileRealName
                    },
                    downloadUrl: "/file/download/"+fileRealName,
                }
                console.log(response)
                res.end(JSON.stringify(response))
            }
        })
    })
})

//http://localhost:3000/download/e881c02f2a3449c1b2b58824d17cb61a.jpg?originalName=hh.png
router.get('/download/:realName', function(req, res, next) {
    const originalName = req.param('originalName')
    const realName = req.param('realName')
    const filePath = './upload/' + realName
    fs.readFile(filePath, function(isErr, data) {
        if (isErr) {
            res.end('Read file failed!')
            return
        }
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream', //告诉浏览器这是一个二进制文件
            'Content-Disposition': 'attachment; filename=' + originalName ||realName //告诉浏览器这是一个需要下载的文件
        })
        res.end(data)
    })
})

//http://localhost:3000/preview/e881c02f2a3449c1b2b58824d17cb61a.jpg?originalName=hh.png
router.get('/preview/:realName', function(req, res, next) {
    const realName = req.param('realName')
    const filePath = './upload/' + realName
    fs.readFile(filePath, function(isErr, data) {
        if (isErr) {
            res.end('Read file failed!')
            return
        }
        res.end(data)
    })
})

router.post('/delete/:id', function(req, res, next) {
    DbUtils
    DbUtils.queryObj({ id: req.params.id }, 't_upload_file').then(result => {
        return DbUtils.delete({ id: req.params.id }, 't_upload_file')
            .then(function(result1) {
                fs.unlink(`./upload/${result.realName}`, function(error) {
                    if (error) {
                        console.log(error)
                        return false
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
