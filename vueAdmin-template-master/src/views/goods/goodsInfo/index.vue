<template>
    <div class="jq-container">
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" :model="searchForm">
                    <el-form-item>
                        <el-input v-model="searchForm.pinming" clearable placeholder="标题"></el-input>
                    </el-form-item>
                    <el-form-item> <el-button type="primary" v-on:click="searchFn">查询</el-button> </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="editPageShow = true">新增</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <jq-table ref="grid" url="/goodsInfo/list" :columns="columns"> </jq-table>

        <el-dialog v-model="editPageShow"> <EditPage></EditPage> </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import EditPage from './editPage'
export default {
    methods: {
        searchFn() {
            this.$refs.grid.searchForm(this.searchForm)
        }
    },
    components: { EditPage },
    mounted: function() {},
    data() {
        return {
            editPageShow: false,
            searchForm: {
                pinming: ''
            },
            columns: [
                { prop: 'pinming', label: '品名' },
                { prop: 'guige', label: '规格' },
                { prop: 'danwei', label: '单位' },
                { prop: 'jinjia', label: '进价' },
                { prop: 'kucun', label: '库存' },
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
            page: {
                sizes: [9, 18, 36, 72],
                size: 9,
                number: 1,
                total: 0
            },
            tableData: []
        }
    }
}
</script>
