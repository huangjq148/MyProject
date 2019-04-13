var Vue = require("vue/dist/vue.common.js");
import axios from 'axios';
import ElementUI from 'element-ui';
// import css from 'element-ui/lib/theme-chalk/index.css';
// require("element-ui/lib/theme-chalk/index.css");
Vue.use(ElementUI);

var sellApp = new Vue({
    el: '#sellApp',
    data:function(){
        return {
            goodsId:"",
            date:"",
            sellTotalNum: 0,
            sellPerPrice: 0,
            sellTotalMoney: 0,
            sellList:[],
            goodsList: [],
            dialogVisible: false
        }
    },
    methods:{
        autoInputFun(){
            var self = this;
            var totalNum_PerPrice = (self.sellTotalNum != 0 && self.sellPerPrice != 0 );
            var totalNumber_Money = (self.sellTotalNum != 0 && self.sellTotalMoney != 0);
            var perPrice_Money = (self.sellPerPrice != 0 && self.sellTotalMoney != 0);
            var totalNum_perPrice_Money = (self.sellTotalNum != 0 && self.sellPerPrice != 0 && self.sellTotalMoney != 0);

            if(totalNum_perPrice_Money){
                if(self.sellTotalNum != self.sellTotalMoney /  self.sellPerPrice){
                    alert("填写数据有误！");
                }
            }else if(totalNumber_Money){
                self.sellPerPrice = self.sellTotalMoney / self.sellTotalNum;
            }else if(perPrice_Money){
                self.sellTotalNum = self.sellTotalMoney /  self.sellPerPrice;
            }else if(totalNum_PerPrice){
                self.sellTotalMoney = self.sellTotalNum *  self.sellPerPrice;
            } else{
                alert("请至少填写两个数据");
            }

            var length = self.sellList.length;
            var sellTotalNum = self.sellTotalNum;
            for(var i=0;i < length; i++){
                if(sellTotalNum >=0){
                    if(sellTotalNum < self.sellList[i].nowNumber){
                        self.sellList[i].sellNumber = sellTotalNum;
                        self.sellList[i].sellPrice = self.sellPerPrice;
                        sellTotalNum -= sellTotalNum;
                    }else{
                        self.sellList[i].sellNumber = self.sellList[i].nowNumber;
                        self.sellList[i].sellPrice = sellTotalNum;
                        sellTotalNum -= self.sellList[i].nowNumber;
                    }
                }
            }
            if(sellTotalNum > 0){
                alert("填写的数量过大~");
            }
        },
        totalNumChange(){
            var self = this;
            var length = self.sellList.length;
            var sellTotalNum = self.sellTotalNum;
            for(var i=0;i < length; i++){
                if(sellTotalNum >=0){
                    if(sellTotalNum < self.sellList[i].nowNumber){
                        self.sellList[i].sellNumber = sellTotalNum;
                        sellTotalNum -= sellTotalNum;
                    }else{
                        self.sellList[i].sellNumber = self.sellList[i].nowNumber;
                        sellTotalNum -= self.sellList[i].nowNumber;
                    }
                }
            }
            if(sellTotalNum > 0){
                alert("填写的数量过大~");
            }
        },
        totalMoneyChange(){
            var self = this;
            var length = self.sellList.length;
            var sellTotalNum = self.sellTotalNum;
            for(var i=0;i < length; i++){
                if(sellTotalNum >=0){
                    if(sellTotalNum < self.sellList[i].nowNumber){
                        self.sellList[i].sellNumber = sellTotalNum;
                        sellTotalNum -= sellTotalNum;
                    }else{
                        self.sellList[i].sellNumber = self.sellList[i].nowNumber;
                        sellTotalNum -= self.sellList[i].nowNumber;
                    }
                }
            }
            if(sellTotalNum > 0){
                alert("填写的数量过大~");
            }
        },
        perPriceChange(){
            var self = this;
            var length = self.sellList.length;
            var sellTotalNum = self.sellTotalNum;
            for(var i=0;i < length; i++){
                if(sellTotalNum >=0){
                    if(sellTotalNum < self.sellList[i].nowNumber){
                        self.sellList[i].sellNumber = sellTotalNum;
                        sellTotalNum -= sellTotalNum;
                    }else{
                        self.sellList[i].sellNumber = self.sellList[i].nowNumber;
                        sellTotalNum -= self.sellList[i].nowNumber;
                    }
                }
            }
            if(sellTotalNum > 0){
                alert("填写的数量过大~");
            }
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        clickFn:function(){
            axios.get('/tradeInfo/?userId=3&jinhuoList?id=37')
                .then(function (response) {
                    console.log(response.data);
                    sellApp.sellList = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        selectFn:function(){
            axios.get('/tradeInfo/jinhuoList?userId=3&id='+this.goodsId)
                .then(function (response) {
                    sellApp.sellList = response.data.filter(function(a){if(a.nowNumber>0)return a});
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        submitForm:function () {
            var sellList = this.sellList ;
            for(var index in this.sellList){
                if(sellList[index].sellNumber > 0 && sellList[index].sellNumber <= sellList[index].nowNumber){
                    axios.post('/tradeInfo/chuHuoSaveOrUpdate',{data:this.sellList[index],goodsId:this.goodsId,date:this.date})
                        .then(function (response) {
                            sellApp.dialogVisible = true
                            // debugger
                            // console.log(response.data);
                            // sellApp.sellList = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }

            }

        }
    }
});

sellApp.date = new Date();
axios.get('/goodsInfo/list')
    .then(function (response) {
        sellApp.goodsList = response.data.data;
    })
    .catch(function (error) {
        console.log(error);
    });