webpackHotUpdate(0,[function(e,t){var n=new Vue({el:"#app",data:()=>({searchCondition:{startDate:(new Date).toString(),endDate:(new Date).toString(),input4Search:"",searchType:"全部"},data:[],currentPage:1,pagesize:8}),computed:{showData:function(){var e=this,t=[];return this.data.forEach(function(n,r){"全部"==e.searchCondition.searchType?t.push(n):n.type==e.searchCondition.searchType&&t.push(n)}),t},dateFormat:function(e,t){console.log(111111111123)}},methods:{handleSizeChange:function(e){this.pagesize=e},handleCurrentChange:function(e){this.currentPage=e},moneyFn:function(e,t,n){return("进货"==e.type?-e.purPrice:e.sellPrice)*e.number},maoLiFn:function(e,t,n){var r=((e.sellPrice-e.purPrice)*e.number).toFixed(2);return"进货"==e.type&&(r=0),r},maoLiLvFn:function(e,t,n){var r=((e.sellPrice-e.purPrice)/e.sellPrice).toFixed(2);return"进货"==e.type&&(r=0),r},getSummaries:function(e){const{columns:t,data:n}=e,r=[];return r[0]="合计",t.forEach(function(e,t){if(0===t)return void(r[t]="合计");if(t>=1&&t<=5)return;const a=n.map(function(t){return Number(t[e.property])});a.every(function(e){return isNaN(e)})?r[t]="":(r[t]=a.reduce(function(e,t){const n=Number(t);return isNaN(n)?e:e+t},0),r[t]+=" ")}),r}}});axios.get("/tradeInfo/list").then(function(e){n.data=e.data.data}).catch(function(e){console.log(e)})}]);