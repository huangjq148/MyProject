import request from '@/utils/request'

export default {
    fetchData: function(url, params) {
        return request({
            url: url,
            method: 'post',
            data: params
        })
    },
    post: function(url, data) {
        return request({
            url: url,
            method: 'post',
            data: data
        })
    },
    put: function(url, data) {
        return request({
            url: url,
            method: 'put',
            data: data
        })
    },
    get: function(url, params) {
        return request({
            url: url,
            method: 'get',
            params: params
        })
    },
    delete: function(url, params) {
        return request({
            url: url,
            method: 'delete',
            params: params
        })
    },
    deleteFile(id) {
        return request({
            url: '/file/delete/' + id,
            method: 'post'
        })
    }
}
