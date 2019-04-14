<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="品名"> <el-input v-model="form.pinming"></el-input> </el-form-item>
            <el-form-item label="规格"> <el-input v-model="form.guige"></el-input> </el-form-item>
            <el-form-item label="单位"> <el-input v-model="form.danwei"></el-input> </el-form-item>
            <el-form-item label="进价"> <el-input v-model="form.jinjia"></el-input> </el-form-item>
            <el-form-item label="备注"> <el-input v-model="form.remark"></el-input> </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import GoodsApi from '@/api/goods'
export default {
    props: {
        goodsId: ''
    },
    watch: {
        goodsId(val) {
            if (val && val != '') {
                GoodsApi.fetchGoodsInfo(val).then(data => {
                    this.form = data
                })
            } else {
                this.$utils.clearObj(this.form)
            }
        }
    },
    computed: {},
    data() {
        return {
            form: {
                pinming: '',
                guige: '',
                danwei: '',
                jinjia: '',
                remark: ''
            }
        }
    },
    methods: {
        onSubmit() {
            if (this.goodsId) {
                GoodsApi.update(this.form).then(result => {
                    this.$emit('callback')
                })
            } else {
                GoodsApi.save(this.form).then(result => {
                    this.$emit('callback')
                })
            }
        }
    },
    created() {
        if (this.goodsId) {
            GoodsApi.fetchGoodsInfo(this.goodsId).then(data => {
                this.form = data
            })
        }
    }
}
</script>
