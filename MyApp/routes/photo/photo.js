/**
 * Created by Administrator on 2017/8/20 0002.
 */
let express = require('express')
let router = express.Router()
let UUID = require('node-uuid')
let { Utils, DbUtilsClass, ResponseResult } = require('../../utils')
let DbUtils = new DbUtilsClass('t_photo')
let photo = {
    id: '',
    title: '',
    description: '',
    photoDate: ''
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
            res.json(ResponseResult.success())
        })
        .catch(function(err) {
            res.json(err)
        })
})

router.post('/list', function(req, res, next) {
    DbUtils.queryPage(req.body)
        .then(result => {
            res.json(ResponseResult.success(result))
        })
        .catch(reason => {
            res.json({ errMsg: reason })
        })
})

router.get('/listView', function(req, res, next) {
    res.sendfile('views/goodsManager/new/goodsList.html')
})

router.get("/list/:id",function(req,res){
    let id = req.params.id;
    DbUtils.queryList({whereMap:{recordId:id}},"t_upload_file").then(result=>{
        res.json(ResponseResult.success(result))
    }).catch(err=>{
        debugger;
    })
})

router.get('/edit/:id', function(req, res, next) {
    let id = req.params.id
    if (id != '' && id != undefined) {
        let photoInfoFn = DbUtils.queryObj({ id }),
            filesFn = DbUtils.queryList({ whereMap: { recordId: id } }, 't_upload_file')
        Promise.all([photoInfoFn, filesFn])
            .then(result => {
                result[0]['files'] = result[1]['list']
                res.json(ResponseResult.success({ info: result[0],fileList: result[1] }))
            })
            .catch(reason => {
                res.json(reason)
            })
    } else {
        res.json(JSON.stringify({ message: '缺少id参数' }))
    }
})

router.get('/delete/:id', function(req, res, next) {
    let f1 = DbUtils.delete({ id: req.params.id })
    let f2 = DbUtils.delete({ recordId: req.params.id }, 't_upload_file')
    Promise.all([f1, f2]).then(result => {
        res.json(ResponseResult.success())
    })
})

router.get('/latest', function(req,res){
    DbUtils.query("select * from t_upload_file ORDER BY createtime desc limit 1").then(result=>{
        res.json(ResponseResult.success(result[0]))
    })
})

module.exports = router
