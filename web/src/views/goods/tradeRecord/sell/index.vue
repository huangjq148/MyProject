<!--
    @Author huangjq
    @CreateDate 2019/4/20
-->

<template>
    <div>
        <el-form ref="sellForm" :inline="true" :model="trade" label-width="100px" class="demo-form-inline">
            <el-form-item label="品名">
                <jq-select
                    url="/goods/list"
                    v-model="trade.goodsId"
                    value-name="id"
                    label-remark="guige"
                    label-name="pinming"
                    filterable
                    @change="selectFn"
                ></jq-select>
            </el-form-item>
            <el-form-item label="出货日期：">
                <el-date-picker v-model="trade.date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="autoInputFun">自动填入</el-button>
                <!--<el-button type="primary" @click="submitForm">保存</el-button>-->
            </el-form-item>
            <el-row>
                <el-form-item label="出货总数：">
                    <el-input v-model="form.sellTotalNum" clearable placeholder="出货总数"></el-input>
                </el-form-item>
                <el-form-item label="出货单价：">
                    <el-input v-model="form.sellPerPrice" clearable placeholder="出货单价"></el-input>
                </el-form-item>
                <el-form-item label="出货总价：">
                    <el-input v-model="form.sellTotalMoney" clearable placeholder="出货总价"></el-input>
                </el-form-item>
            </el-row>
        </el-form>
        <el-table :data="sellList" style="width: 100%">
            <el-table-column label="进货日期" width="160">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date | dataFormatter }}</span>
                </template>
            </el-table-column>
            <el-table-column label="进货价格" width="160">
                <template slot-scope="scope">
                    {{ scope.row.price }}
                </template>
            </el-table-column>
            <el-table-column label="进货数量" width="160">
                <template slot-scope="scope">
                    {{ scope.row.number }}
                </template>
            </el-table-column>
            <el-table-column label="库存" width="160">
                <template slot-scope="scope">
                    {{ scope.row.nowNumber }}
                </template>
            </el-table-column>
            <el-table-column label="出售价格" width="160">
                <template slot-scope="scope">
                    {{ scope.row.sellPrice }}
                </template>
            </el-table-column>
            <el-table-column label="出售数量" width="160">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.sellNumber" placeholder="审批人"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('callback')">取 消</el-button>
            <el-button type="primary" @click="handleOkClick">确 定</el-button>
        </span>
    </div>
</template>

<script>
export default {
    data() {
        return {
            trade: {
                goodsId: '',
                date: this.$moment().format('YYYY-MM-DD')
            },
            goodsList: [],
            sellList: [],
            form: {
                sellTotalNum: 0,
                sellPerPrice: 0,
                sellTotalMoney: 0
            },
            tableData: []
        }
    },

    methods: {
        handleOkClick() {
            this.submitForm()
        },
        selectFn: function() {
            this.$api
                .get('/trade/jinhuoList', {
                    userId: 1,
                    id: this.trade.goodsId
                })
                .then(response => {
                    this.sellList = response.filter(function(a) {
                        if (a.nowNumber > 0) return a
                    })
                })
        },
        resetForm() {
            this.date = ''
            this.form.sellTotalNum = 0
            this.form.sellPerPrice = 0
            this.form.sellTotalMoney = 0
        },
        getSell: function(sellInfo) {
            return {
                belongUserId: 1,
                date: this.trade.date,
                goodsId: this.trade.goodsId,
                purchaseId: sellInfo.id,
                price: sellInfo.price,
                sellNumber: sellInfo.sellNumber,
                sellPrice: sellInfo.sellPrice,
                remark: JSON.stringify(sellInfo)
            }
        },
        submitForm: function() {
            var _this = this
            var sellList = this.sellList
            var serverUrl = _this.$store.state.serverUrl
            for (var index in this.sellList) {
                let sellInfo = this.sellList[index]
                if (sellInfo.sellNumber > 0 && sellInfo.sellNumber <= sellInfo.nowNumber) {
                    let sell = this.getSell(sellInfo)
                    this.$api.post('/trade/sell', sell).then(res => {
                        this.$emit('callback')
                    })
                }
            }
        },
        autoInputFun() {
            var _this = this
            var totalNum_PerPrice = _this.form.sellTotalNum != 0 && _this.form.sellPerPrice != 0
            var totalNumber_Money = _this.form.sellTotalNum != 0 && _this.form.sellTotalMoney != 0
            var perPrice_Money = _this.form.sellPerPrice != 0 && _this.form.sellTotalMoney != 0
            var totalNum_perPrice_Money =
                _this.form.sellTotalNum != 0 && _this.form.sellPerPrice != 0 && _this.form.sellTotalMoney != 0

            if (totalNum_perPrice_Money) {
                if (_this.form.sellTotalNum != _this.form.sellTotalMoney / _this.form.sellPerPrice) {
                    alert('填写数据有误！')
                }
            } else if (totalNumber_Money) {
                _this.form.sellPerPrice = _this.form.sellTotalMoney / _this.form.sellTotalNum
            } else if (perPrice_Money) {
                _this.form.sellTotalNum = _this.form.sellTotalMoney / _this.form.sellPerPrice
            } else if (totalNum_PerPrice) {
                _this.form.sellTotalMoney = _this.form.sellTotalNum * _this.form.sellPerPrice
            } else {
                alert('请至少填写两个数据')
            }

            var length = _this.sellList.length
            var sellTotalNum = _this.form.sellTotalNum
            for (var i = 0; i < length; i++) {
                if (sellTotalNum >= 0) {
                    if (sellTotalNum < _this.sellList[i].nowNumber) {
                        _this.sellList[i].sellNumber = sellTotalNum
                        if (sellTotalNum > 0) {
                            _this.sellList[i].sellPrice = _this.form.sellPerPrice
                        }
                        sellTotalNum -= sellTotalNum
                    } else {
                        _this.sellList[i].sellNumber = _this.sellList[i].nowNumber

                        if (_this.sellList[i].nowNumber > 0) {
                            _this.sellList[i].sellPrice = _this.form.sellPerPrice
                        }
                        sellTotalNum -= _this.sellList[i].nowNumber
                    }
                }
            }
            if (sellTotalNum > 0) {
                alert('填写的数量过大~')
            }
        }
    }
}
</script>

<style scope lang="scss">
.el-select {
    width: 220px;
}

.el-select .el-input {
    width: 220px;
}
.el-input {
    width: 220px;
}
</style>
