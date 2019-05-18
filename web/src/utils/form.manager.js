/**
 *   @Author huangjq
 *   @createDate 2019/5/3
 */
import BaseApi from '@/api/base'
const form = function() {
    return new FormModel(this)
}
const FormModel = function(self) {
    this.$refs = self.$refs
    this.$message = self.$message
}
FormModel.prototype = {
    add() {
        BaseApi.post(this.$refs.saveForm.$attrs.action, this.$refs.saveForm.model)
            .then(res => {
                if (res.statusCode == 2000) {
                    this.$message.success(res.message)
                }
                return res
            })
            .catch(reason => {
                this.$message.error(reason || '操作失败')
            })
    },
    delete() {},
    load() {},
    update() {}
}

export default form
