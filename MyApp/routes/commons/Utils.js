/**
 * Created by Administrator on 2017/9/20 0020.
 */

let utils = {
    sortable: {
        ascending: 'asc',
        descending: 'desc',
        asc: 'asc',
        desc: 'desc'
    },
    getParameter(paramName, req) {
        return req.body[paramName] || req.query[paramName]
    },
    copyValue(targetObj, sourceObj) {
        for (let key in targetObj) {
            if (sourceObj[key]) {
                targetObj[key] = sourceObj[key]
            } else {
                targetObj[key] = ''
            }
        }
        return targetObj
    }
}

module.exports = utils
