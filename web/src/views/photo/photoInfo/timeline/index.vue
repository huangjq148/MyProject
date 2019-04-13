<!--
    @Author huangjq
    @CreateDate 2019/3/21
-->
<template>
    <div>
        时间轴

        <el-timeline>
            <!--<el-timeline-item timestamp="2018/4/12" placement="top">-->
            <!--<el-card>-->
            <!--<h4>更新 Github 模板</h4>-->
            <!--<p>王小虎 提交于 2018/4/12 20:46</p>-->
            <!--</el-card>-->
            <!--</el-timeline-item>-->
            <!--<el-timeline-item timestamp="2018/4/3" placement="top">-->
            <!--<el-card>-->
            <!--<h4>更新 Github 模板</h4>-->
            <!--<p>王小虎 提交于 2018/4/3 20:46</p>-->
            <!--</el-card>-->
            <!--</el-timeline-item>-->

            <el-timeline-item v-for="data in showData" :timestamp="data.photoDate" placement="top">
                <el-card>
                    <h4>{{ data.title }}</h4>
                    <p>{{ data.description }}</p>
                    <img style="height:300px;margin-left: 10px;" v-for="url of data.photoNames" :src="url" alt="" />
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
import BaseApi from '@/api/base'
export default {
    name: 'index',
    data() {
        return { dataSource: [] }
    },
    computed: {
        showData() {
            this.dataSource.map(item => {
                item.photoNames = item.photoNames.split(',').map(item => {
                    item = process.env.BASE_API + '/file/download?originalName=hh.png&realName=' + item
                    return item
                })
            })
            debugger
            return this.dataSource
        }
    },
    created() {
        BaseApi.fetchData('/photo/list', { page: { size: 100, number: 1 } }).then(result => {
            this.dataSource = result.data.list
        })
    }
}
</script>

<style scoped></style>
