<!--
    @Author huangjq
    @CreateDate 2019/4/20
-->
<template>
    <el-select
        :value="selectValue"
        :size="size"
        @input="change($event)"
        ref="select"
        placeholder="请选择"
        v-bind="$attrs"
        v-on="$listeners"
    >
        <el-option v-for="item in showOptions" :key="item[value]" :label="item[label]" :value="item[value]">
            <span style="float: left">{{ item[label] }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item['guige'] }}</span>
        </el-option>
    </el-select>
</template>

<script>
import { Select } from 'element-ui'
import DataOp from '@/api/base'
let methods = {}
for (let method in Select.methods) {
    methods[method] = new Function(`return this.$refs.select.${method}.apply(this,arguments)`)
}
export default {
    name: 'JqSelect',
    data() {
        return {
            dataSource: [],
            data: [],
            selectValue: '',
            size: ''
        }
    },
    props: {
        url: '',
        value: {
            type: String,
            default: 'value',
            required: false
        },
        label: {
            type: String,
            default: 'label',
            required: false
        }
    },
    computed: {
        showOptions() {
            return this.dataSource || this.data
        },
        change: function(val) {
            this.$emit('input', val)
        }
    },
    methods: {
        loadData() {
            if (this.url) {
                DataOp.fetchData(this.url).then(res => {
                    this.dataSource = res.list
                })
            }
        },
        change: function(val) {
            this.$emit('input', val)
        }
    },
    created() {
        this.loadData()
    }
}
</script>

<style scoped></style>
