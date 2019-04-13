<template>
    <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="item in imgUrlList" :key="item">
            <img style="max-height: 100%;min-height: 50px;" v-bind:src="item" alt="" />
        </el-carousel-item>
    </el-carousel>
</template>

<script>
export default {
    name: 'imgPage',
    data() {
        return {}
    },
    computed: {
        imgUrlList() {
            let list = this.imgNames.split(',')
            return list.map(function(item) {
                return process.env.BASE_API + '/file/download?originalName=hh.png&realName=' + item
            })
        }
    },
    props: {
        imgNames: {
            type: String
        }
    }
}
</script>
<style>
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
