/**
 *   @Author huangjq
 *   @createDate 2019/4/14
 */
class ResponseResult {
    constructor() {
        this.result = {
            statusCode: 2000,
            message: '操作成功'
        }
    }

    success(message) {
        this.result.statusCode = 2000
        this.result.message = message || '操作成功'
        return JSON.stringify(this.result)
    }

    fail(message) {
        this.result.statusCode = 3000
        this.result.message = message || '操作失败'
        return JSON.stringify(this.result)
    }
}

module.exports = ResponseResult
