/**
 *   @Author huangjq
 *   @createDate 2019/4/14
 */
class ResponseResult {
    constructor() {
        this.result = {
            code: 200,
            data: {},
            message: '操作成功'
        }
    }

    success(data = {}, message = '操作成功') {
        this.result.code = 200
        this.result.data = data
        this.result.message = message
        return JSON.stringify(this.result)
    }

    fail(data, message) {
        this.result.code = 300
        this.result.data = data
        this.result.message = message || '操作失败'
        return JSON.stringify(this.result)
    }
}

module.exports = new ResponseResult()
