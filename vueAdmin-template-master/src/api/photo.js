import request from '@/utils/request'

export default {
    fetchPhotoList: function(params) {
        return request({
            url: '/photo/list',
            method: 'get',
            params: params
        })
    },
    deletePhoto: function(id) {
        return request({
            url: '/photo/delete/' + id,
            method: 'get'
        })
    },
    save: function(data) {
        return request({
            url: '/photo/saveOrUpdate',
            method: 'post',
            data: data
        })
    }
}
