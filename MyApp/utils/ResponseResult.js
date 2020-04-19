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

    fail(data, message = '操作失败', code = 300) {
        console.error(data)
        this.result.code = code
        this.result.data = data
        this.result.message = message
        return JSON.stringify(this.result)
    }

    noLogin() {
        console.error("需要登录或者没有通过登陆认证")
        const result = {
            code: 401,
            message:"需要登录或者说没有通过登陆认证"
        }
        return JSON.stringify(result)
    }

    noPermission(){
        console.error("权限不足")
        const result = {
            code: 403,
            message:"权限不足"
        }
        return JSON.stringify(result)
    }
}

module.exports = new ResponseResult()
