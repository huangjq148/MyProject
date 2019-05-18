<!--
    @Author huangjq
    @CreateDate 2019/4/20
-->
<template>
    <el-select class="dg-select" :value="value" v-bind="$attrs" @change="handleChange" v-on="listeners">
        <el-option v-for="item in showOptions" :key="item[valueName]" :label="item[labelName]" :value="item[valueName]">
            <span style="float: left">{{ item[labelName] }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item[labelRemark] }}</span>
        </el-option>
    </el-select>
</template>

<script>
import { Select, Option } from 'element-ui'
import DataOp from '@/api/base'
let methods = {}
for (let method in Select.methods) {
    methods[method] = new Function(`return this.$refs.select.${method}.apply(this,arguments)`)
}
export default {
    name: 'JqSelect',
    data() {
        return {
            dataSource: this.data,
            selectValue: '',
            size: ''
        }
    },

    components: {
        ElSelect: Select,
        ElOption: Option
    },

    props: {
        value: {
            type: [String, Array],
            default() {
                return ''
            },
            required: true
        },
        // 选项配置数据
        data: {
            type: Array,
            default() {
                return []
            }
        },
        // 值的字段名称
        valueName: {
            type: String,
            default: 'value'
        },
        // 显示的字段名称
        labelName: {
            type: String,
            default: 'label'
        },
        url: '',
        labelRemark: {
            type: String,
            default: 'label',
            required: false
        }
    },
    computed: {
        listeners() {
            let newListeners = {}
            for (let key in this.$listeners) {
                if (key !== 'change' && key !== 'input') {
                    newListeners[key] = this.$listeners[key]
                }
            }
            return newListeners
        },
        showOptions() {
            return this.dataSource || this.data
        }
    },
    methods: {
        ...methods,
        loadData() {
            if (this.url) {
                DataOp.fetchData(this.url).then(res => {
                    this.dataSource = res.list
                })
            }
        },
        handleChange: function(val) {
            this.$emit('input', val)
            this.$emit('change', val)
        }
    },
    created() {
        this.loadData()
    }
}
</script>

<style scoped></style>
