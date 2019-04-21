<!--
    @Author huangjq
    @CreateDate 2019/3/18
-->
<template>
    <div class="jq-upload">
        <el-upload
            ref="upload"
            :action="action"
            :list-type="listType"
            :file-list.sync="showFiles"
            accept="image/jpeg,image/gif,image/png"
            :on-success="uploadSuccess"
            :on-remove="handleRemove"
            :auto-upload="true"
            v-bind="$attrs"
            v-on="$listeners"
        >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
import { Upload } from 'element-ui'
import DataOp from '@/api/base'
let methods = {}
for (let method in Upload.methods) {
    methods[method] = new Function(`return this.$refs.upload.${method}.apply(this,arguments)`)
}
methods.uploadSuccess = function(response, file, files) {
    file.realName = response.filename.realName
    file.originalName = response.filename.originalName
    file.isAdd = true
    this.value = files
}
methods.handleRemove = function(file) {
    DataOp.deleteFile(file.id).then(response => {
        if (response == 'success') {
            this.$notify({ title: '成功', message: '删除成功', type: 'success' })
        } else {
            this.$notify.error({ title: '错误', message: '删除出错' })
        }
        this.$refs.grid.fetchData()
    })
}

export default {
    name: 'JqUpload',
    props: {
        listType: {
            default: 'picture-card'
        },
        action: {
            default: `${process.env.BASE_API}/file/upload`
        },
        fileList: {
            default: () => []
        }
    },
    methods: methods,

    computed: {
        initVal() {
            return this.$attrs.value
        },

        showFiles() {
            debugger
            return this.value.map(item => {
                item.name = item.originalName
                item.url = `${process.env.BASE_API}/file/download?originalName=asd.png&realName=${item.realName}`
                return item
            })
        }
    },
    components: { Upload },
    data() {
        return {
            value: []
        }
    }
}
</script>

<style scoped></style>
