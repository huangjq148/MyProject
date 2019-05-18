export default {
    objectAssign(targetObj, sourceObj) {
        for (let key in targetObj) {
            if (sourceObj && sourceObj[key]) {
                targetObj[key] = sourceObj[key]
            }
        }
        return targetObj
    },

    clearObj(obj) {
        for (let key in obj) {
            switch (typeof obj[key]) {
                case 'number':
                    obj[key] = 0
                    break
                case 'object':
                    if (obj[key] instanceof Array) {
                        obj[key].length = 0
                    } else {
                        obj[key] = {}
                    }
                    break
                case 'string':
                    obj[key] = ''
                    break
            }
        }
    }
}
