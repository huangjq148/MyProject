/**
 *   @Author huangjq
 *   @createDate 2019/4/7
 */
export default {
    objectAssign(targetObj, sourceObj) {
        for (let key in targetObj) {
            if (sourceObj && sourceObj[key]) {
                targetObj[key] = sourceObj[key]
            }
        }
        return targetObj
    }
}
