/**
 *   @Author huangjq
 *   @createDate 2019/4/14
 */
import request from '@/utils/request'

export default {
    fetchGoodsInfo: function(id) {
        return request({
            url: `/goods/${id}`,
            method: 'get'
        })
    },
    save: function(data) {
        return request({
            url: '/goods/save',
            method: 'post',
            data: data
        })
    },
    update: function(data) {
        return request({
            url: '/goods',
            method: 'put',
            data: data
        })
    },
    delete: function(id) {
        return request({
            url: `/goods/${id}`,
            method: 'delete'
        })
    }
}
