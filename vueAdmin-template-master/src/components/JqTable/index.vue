<template>
    <div class="JqTable">
        <el-table :data="dataSource" v-bind="$attrs" @sort-change="sortFn">
            <template v-for="(column, index) in columns">
                <el-table-column v-if="column.options" :key="index">
                    <template slot-scope="scope">
                        <el-button
                            @click="option.func(scope.row)"
                            v-for="(option, index1) in column.options"
                            :key="index1"
                            type="text"
                            size="small"
                        >
                            {{ option.label }}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    :key="index"
                    v-else
                    sortable="custom"
                    show-overflow-tooltip
                    :prop="column.prop"
                    :label="column.label"
                    :formatter="column.formatter"
                >
                    ></el-table-column
                >
            </template>
        </el-table>

        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.number"
            :page-sizes="page.sizes"
            :page-size="page.size"
            :total="page.total"
            layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
    </div>
</template>

<script>
import DataOp from '@/api/base'
import ObjUtils from '@/utils/dataUtils'
import { Table, Pagination, TableColumn } from 'element-ui'
export default {
    name: 'JqTable',
    props: {
        url: '',
        data: {
            type: Array,
            default: () => {
                return []
            },
            required: false
        },
        columns: {
            type: Array,
            default: () => {
                return []
            },
            required: false
        },
        page: {
            type: Object,
            default: () => {
                return {
                    sizes: [10, 20, 30, 40],
                    size: 10,
                    number: 1,
                    total: 10
                }
            }
        }
    },
    data() {
        return {
            dataSource: this.data,
            sort: {},
            condition: {}
        }
    },
    computed: {},
    methods: {
        handleSizeChange(val) {
            this.page.size = val
            this.fetchData()
        },
        handleCurrentChange(val) {
            this.page.number = val
            this.fetchData()
        },
        fetchData(params) {
            ObjUtils.objectAssign(this.page, params)
            DataOp.fetchData(this.url, {
                page: this.page,
                condition: this.condition,
                sort: this.sort
            }).then(result => {
                this.dataSource = result.data.list
                this.page.total = result.data.total
            })
        },
        searchForm(formData) {
            Object.assign(this.condition, formData)
            this.fetchData()
        },
        sortFn({ prop, order }) {
            this.sort['key'] = prop
            this.sort['value'] = order
            this.fetchData()
        }
    },
    components: {
        Table,
        Pagination,
        TableColumn
    },
    created() {
        this.fetchData()
    }
}
</script>

<style scoped></style>
