<!--
    @Author huangjq
    @CreateDate 2019/4/20
-->
<template>
    <div>
        <el-form>
            <el-form-item label="品名">
                {{ vData }}
                <jq-select url="/goods/list" v-model="vData" label="pinming"></jq-select>
            </el-form-item>
            <el-form-item></el-form-item>
            <el-form-item></el-form-item>
            <el-form-item></el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="$emit('callback')">取 消</el-button>
        </span>
    </div>
</template>

<script>
import JqTable from '../../../../components/base/JqTable/index'
import JqSelect from '../../../../components/base/JqSelect/index'
export default {
    name: 'purchasePage',
    components: { JqSelect, JqTable },
    data() {
        return {
            vData: ''
        }
    },
    methods: {
        onSubmit() {
            this.$emit('callback')
        }
    }
}
</script>

<style scoped></style>
