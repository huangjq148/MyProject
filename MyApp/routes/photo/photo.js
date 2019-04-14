/**
 * Created by Administrator on 2017/8/20 0002.
 */
let express = require('express')
let router = express.Router()
let UUID = require('node-uuid')
let { Utils, DbUtilsClass, ResponseResult } = require('../commons')
let DbUtils = new DbUtilsClass('t_photo')
let photo = {
    id: '',
    title: '',
    description: '',
    photoDate: '',
    createTime: ''
}
let file = {
    id: '',
    recordId: '',
    originalName: '',
    realName: ''
}

router.post('/saveOrUpdate', function(req, res, next) {
    Utils.copyValue(photo, req.body.photoInfo)
    let fileList = req.body.photoInfo.fileList.filter(item => item.isAdd),
        photoOpFn,
        waitArr = []

    if (!photo.id) {
        photoOpFn = DbUtils.insert(photo)
        waitArr.push(photoOpFn)
    } else {
        photoOpFn = DbUtils.update(photo, { id: photo.id })
        waitArr.push(photoOpFn)
    }
    for (let tmpFile of fileList) {
        Utils.copyValue(file, tmpFile)
        file.recordId = photo.id
        let fileSaveFn = DbUtils.insert(file, 't_upload_file')
        waitArr.push(fileSaveFn)
    }

    Promise.all(waitArr)
        .then(function(data) {
            res.end(ResponseResult.success())
        })
        .catch(function(err) {
            res.end(err)
        })
})

router.post('/list', function(req, res, next) {
    DbUtils.queryList(req.body)
        .then(result => {
            res.end(JSON.stringify(result))
        })
        .catch(reason => {
            res.end(JSON.stringify({ errMsg: reason }))
        })
})

router.get('/listView', function(req, res, next) {
    res.sendfile('views/goodsManager/new/goodsList.html')
})

router.post('/edit/:id', function(req, res, next) {
    let id = req.params.id
    if (id != '' && id != undefined) {
        let photoInfoFn = DbUtils.queryObj({ id }),
            filesFn = DbUtils.queryList({ condition: { recordId: id } }, 't_upload_file')
        Promise.all([photoInfoFn, filesFn])
            .then(result => {
                result[0]['files'] = result[1]['list']
                res.end(JSON.stringify({ info: result[0] }))
            })
            .catch(reason => {
                res.end(reason)
            })
    } else {
        res.end(JSON.stringify({ message: '缺少id参数' }))
    }
})

router.get('/delete/:id', function(req, res, next) {
    let f1 = DbUtils.delete({ id: req.params.id })
    let f2 = DbUtils.delete({ recordId: req.params.id }, 't_upload_file')
    Promise.all([f1, f2]).then(result => {
        res.end(ResponseResult.success())
    })
})

module.exports = router
