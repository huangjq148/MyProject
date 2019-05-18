<!--
    @Author huangjq
    @CreateDate 2019/4/20
-->
<template>
    <div>
        <el-form label-width="5em" ref="saveForm" :model="trade" action="/trade/purchase">
            <el-form-item label="品名">
                <jq-select
                    url="/goods/list"
                    v-model="trade.goodsId"
                    value-name="id"
                    label-remark="guige"
                    label-name="pinming"
                ></jq-select>
            </el-form-item>
            <el-form-item label="进货日期">
                <el-date-picker placeholder="日期" v-model="trade.date"></el-date-picker>
            </el-form-item>
            <el-form-item label="数量"> <el-input placeholder="数量" v-model="trade.number"></el-input> </el-form-item>
            <el-form-item label="单价"><el-input placeholder="单价" v-model="trade.price"></el-input></el-form-item>
            <el-form-item label="备注"><el-input placeholder="备注" v-model="trade.remark"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="$emit('callback')">取 消</el-button>
            <el-button type="primary" @click="saveForm">确 定</el-button>
        </span>
    </div>
</template>

<script>
export default {
    name: 'purchasePage',

    data() {
        return {
            trade: {
                goodsId: '',
                date: this.$moment().format('YYYY-MM-DD'),
                number: '',
                price: '',
                remark: ''
            }
        }
    },

    methods: {
        saveForm() {
            this.$form()
                .add()
                .then(() => {
                    this.$emit('callback')
                })
        }
    }
}
</script>

<style scoped></style>
