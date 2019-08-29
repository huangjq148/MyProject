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
    cleanData(targetObj){
        for (let key in targetObj) {
            if(typeof targetObj[key] === "number"){
                targetObj[key] = 0;
            }else if(typeof targetObj[key] === "string"){
                targetObj[key] = ""
            }
        }
    },
    copyValue(targetObj, sourceObj) {
        this.cleanData(targetObj)
        for (let key in targetObj) {
            if (sourceObj[key]) {
                targetObj[key] = sourceObj[key]
            }
        }
        return targetObj
    }
}

module.exports = utils
