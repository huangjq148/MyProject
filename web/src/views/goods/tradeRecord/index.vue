<template>
    <div class="jq-container">
        <el-row>
            <el-form v-model="searchCondition" label-position="left" label-width="80">
                <el-col :span="10">
                    <el-form-item label="日期范围">
                        <el-date-picker
                            v-model="searchCondition.dateRange"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                        >
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item>
                        <el-input
                            placeholder="请输入内容"
                            @keyup.enter.native="loadData"
                            v-model="searchCondition.pinming"
                            class="input-with-select"
                        >
                            <el-select
                                @change="loadData"
                                v-model="searchCondition.type"
                                slot="prepend"
                                placeholder="请选择"
                            >
                                <el-option label="全部" value=""></el-option>
                                <el-option label="进货" value="进货"></el-option>
                                <el-option label="出货" value="出货"></el-option>
                            </el-select>
                            <el-button @click="handleSearchClick" slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-form>
        </el-row>
        <el-row>
            <el-button type="primary" @click="purchase">进货</el-button>
            <el-button type="primary" @click="sell">出货</el-button>
            <el-button type="primary" @click="deleteRecords">删除</el-button>
        </el-row>

        <jq-table :condition="searchCondition" ref="grid" url="/trade/list" :columns="columns"> </jq-table>

        <el-dialog title="提示" :visible.sync="purDialogVisible" width="400px">
            <purchasePage @callback="purDialogVisible = false"> </purchasePage>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="sellDialogVisible" width="80%">
            <sellPage @callback="sellDialogVisible = false"></sellPage>
        </el-dialog>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import sellPage from './sell'
import purchasePage from './purchase'

export default {
    mounted: function() {
        this.loadData()
    },
    components: {
        sellPage,
        purchasePage
    },
    data() {
        return {
            columns: [
                { prop: 'pinming', label: '品名' },
                { prop: 'guige', label: '规格' },
                { prop: 'purPrice', label: '进价' },
                { prop: 'sellPrice', label: '售价' },
                { prop: 'type', label: '类型' },
                { prop: 'number', label: '数量' },
                { formatter: this.moneyFn, label: '金额' },
                { formatter: this.maoLiFn, label: '毛利' },
                { formatter: this.maoLiLvFn, label: '毛利率' },
                { prop: 'date', label: '日期' },
                {
                    prop: 'op',
                    options: [{ label: '编辑', func: this.handleEdit }, { label: '删除', func: this.handleDelete }],
                    label: '操作'
                }
            ],
            page: {
                sizes: [9, 18, 36, 72],
                size: 9,
                number: 1,
                total: 0
            },
            searchCondition: {
                dateRange: [],
                pinming: '',
                type: ''
            },
            tableData: [],
            purDialogVisible: false,
            sellDialogVisible: false
        }
    },
    methods: {
        loadData() {
            this.$refs.grid.searchForm()
        },
        handleSearchClick() {
            this.$refs.grid.searchForm()
        },
        purchase: function() {
            this.purDialogVisible = true
        },
        sell: function() {
            this.sellDialogVisible = true
        },
        deleteRecords: function() {
            debugger
        },
        dateFormat: function(row, col) {
            var date = row[col.property]
            if (date == undefined) {
                return ''
            }
            return moment(date).format('YYYY-MM-DD')
        },
        moneyFn: function(row, column, cellValue) {
            var perPrice
            row.type == '进货' ? (perPrice = -row.purPrice) : (perPrice = row.sellPrice)
            return perPrice * row.number
        },
        maoLiFn: function(row, column, cellValue) {
            var returnValue = ((row.sellPrice - row.purPrice) * row.number).toFixed(2)
            row.type == '进货' && (returnValue = 0)
            return returnValue
        },
        maoLiLvFn: function(row, column, cellValue) {
            var returnValue = ((row.sellPrice - row.purPrice) / row.sellPrice).toFixed(2)
            row.type == '进货' && (returnValue = 0)
            return returnValue
        }
    }
}
</script>
<style>
.el-select {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
</style>
