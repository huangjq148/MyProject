import request from '@/utils/request'

export default {
    fetchData: function(url, params) {
        return request({
            url: url,
            method: 'post',
            data: params
        })
    },
    save: function(url, data) {
        return request({
            url: url,
            method: 'post',
            data: data
        })
    },
    deleteFile(id) {
        return request({
            url: '/file/delete/' + id,
            method: 'post'
        })
    }
}
