<template>
    <div class="jq-container">
        <el-col :span="24" class="toolbar">
            <el-form :inline="true" :model="searchForm">
                <el-form-item>
                    <el-input v-model="searchForm.title" clearable placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item> <el-button type="primary" v-on:click="searchFn">查询</el-button> </el-form-item>
                <el-form-item> <el-button type="primary" @click="handleAdd">新增</el-button> </el-form-item>
            </el-form>
        </el-col>

        <jq-table :condition="searchForm" ref="grid" url="/photo/list" :columns="columns"> </jq-table>

        <el-dialog :modal-append-to-body="false" :visible.sync="dialogVisible" width="80%" style="text-align: center;">
            <imgPage v-bind:imgNames="imgNames"></imgPage>
        </el-dialog>

        <el-dialog
            :modal-append-to-body="false"
            :visible.sync="editDialogVisible"
            width="50%"
            style="text-align: center;"
        >
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="照片标题"> <el-input v-model="form.title"></el-input> </el-form-item>
                <el-form-item label="详细描述">
                    <el-input type="textarea" :rows="5" v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-date-picker
                        type="date"
                        placeholder="选择日期"
                        v-model="form.photoDate"
                        style="width: 100%;"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item> <jq-upload ref="uploader"></jq-upload> </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="saveForm">保存</el-button>
                    <el-button @click="resetForm">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import imgPage from '../imgPage'

import PhotoApi from '@/api/photo'
import BaseApi from '@/api/base'

export default {
    methods: {
        showImg(row) {
            this.dialogVisible = true
            this.imgNames = row.photoNames
        },
        openEditDialog(row) {
            this.dataId = row.id
            this.editDialogVisible = true
            BaseApi.fetchData(`/photo/edit/${this.dataId}`).then(response => {
                this.$refs.uploader.value = response.info.files
                this.form = response.info
            })
        },
        deleteData(row) {
            PhotoApi.deletePhoto(row.id).then(result => {
                this.$refs.grid.searchForm()
            })
        },
        dateFormater(row, col, val) {
            let fmt = 'YYYY-MM-DD'
            return this.$moment(val).format(fmt)
        },
        searchFn() {
            this.$refs.grid.searchForm()
        },
        handleAdd() {
            this.editDialogVisible = true
            if (this.$refs.uploader) {
                this.$refs.uploader.clearFiles()
                this.$refs.uploader.value = []
            }
            this.form = {
                id: '',
                photoDate: '',
                fileList: [],
                title: '',
                description: ''
            }
        },
        saveForm: function() {
            this.form.fileList = this.$refs.uploader.value
            BaseApi.save('/photo/saveOrUpdate', { photoInfo: this.form }).then(response => {
                this.editDialogVisible = false
                if (response.statusCode == '2000') {
                    this.$notify({
                        title: '成功',
                        message: '保存成功',
                        type: 'success'
                    })
                } else {
                    this.$notify.error({
                        title: '错误',
                        message: '保存出错'
                    })
                }
                this.$refs.grid.fetchData()
            })
        },
        resetForm: function() {}
    },
    components: {
        imgPage
    },
    mounted: function() {},
    computed: {},
    data() {
        return {
            columns: [
                { prop: 'title', label: '标题' },
                { prop: 'description', label: '描述' },
                { prop: 'photoDate', label: '时间', formatter: this.dateFormater },
                {
                    prop: 'op',
                    options: [
                        { label: '查看', func: this.showImg },
                        { label: '编辑', func: this.openEditDialog },
                        { label: '删除', func: this.deleteData }
                    ],
                    label: '操作'
                }
            ],
            form: {
                id: '',
                date: '',
                fileList: [],
                title: '',
                description: ''
            },
            tableData: [],
            searchForm: {
                title: ''
            },
            imgNames: '',
            dataId: '',
            dialogVisible: false,
            editDialogVisible: false
        }
    }
}
</script>
