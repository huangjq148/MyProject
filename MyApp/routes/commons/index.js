/**
 *   @Author huangjq
 *   @createDate 2019/4/14
 */
const DbUtilsClass = require('./DbUtils')
const ResponseResultClass = require('./ResponseResult')
const query = require('./db.js')
const Utils = require('./Utils')
const ResponseResult = new ResponseResultClass()
module.exports = {
    DbUtilsClass,
    ResponseResult,
    query,
    Utils
}
