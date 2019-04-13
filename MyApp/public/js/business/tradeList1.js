// var Vue = require("vue/dist/vue.common.js");
// var axios = require("axios");
// var ElementUI = require("element-ui");
// var common = require("./common.js");
// Vue.use(ElementUI);
var app = new Vue({

    el: "#app",
    data() {
        return {
            searchCondition: {
                startDate: (new Date()).toString(),
                endDate: (new Date()).toString(),
                input4Search: "",
                searchType: "全部"
            },
            data: [],
            dialogVisible: false,
            // showData:[],
            currentPage: 1,
            pagesize: 8,

        }
    },
    computed: {
        showData: function () {
            var self = this;
            var returnData = [];
            this.data.forEach(function (column, index) {
                if (self.searchCondition.searchType == "全部") {
                    returnData.push(column);
                }
                else if (column.type == self.searchCondition.searchType) {
                    returnData.push(column);
                }
            })
            return returnData;
        }
    },
    methods: {
        purchase: function(){
            this.dialogVisible = true;
            debugger;
        },
        sell: function(){
            debugger;
        },
        deleteRecords: function(){
            debugger;
        },
        handleSizeChange: function (size) {
            this.pagesize = size;
        },
        handleCurrentChange: function (currentPage) {
            this.currentPage = currentPage;
        },
        moneyFn: function (row, column, cellValue) {
            var perPrice;
            (row.type == "进货") ? (perPrice = -row.purPrice) : perPrice = row.sellPrice;
            return perPrice * row.number;
        },
        maoLiFn: function (row, column, cellValue) {
            var returnValue = ((row.sellPrice - row.purPrice) * row.number).toFixed(2);
            row.type == "进货" && (returnValue = 0);
            return returnValue;
        },
        maoLiLvFn: function (row, column, cellValue) {
            var returnValue = ((row.sellPrice - row.purPrice) / row.sellPrice).toFixed(2);
            row.type == "进货" && (returnValue = 0);
            return returnValue;
        },
        getSummaries: function (param) {
            // debugger;
            const {columns, data} = param;
            const sums = [];
            sums[0] = '合计';
            columns.forEach(function (column, index) {
                if (index === 0) {
                    sums[index] = '合计';
                    return;
                }
                if (index >= 1 && index <= 5) {
                    return;
                }
                const values = data.map(function (item) {
                        return Number(item[column.property])
                    }
                    )
                ;
                if (!values.every(function (value) {
                    return isNaN(value)
                })) {
                    sums[index] = values.reduce(function (prev, curr) {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        },
                        0
                    )
                    ;
                    sums[index] += ' ';
                }
                else {
                    sums[index] = '';
                }
            })
            ;

            return sums;
        },
        dateFormat: function (row,col) {
            var date = row[col.property];
            if (date == undefined) {
                return "";
            }
            return moment(date).format("YYYY-MM-DD");
        }
    }
});

axios.get('/tradeInfo/list')
    .then(function (response) {
        app.data = response.data.data;
        // app.showData = app.data;
    })
    .catch(function (error) {
        console.log(error);
    });