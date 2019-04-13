<style>
  .el-select .el-input {
    width: 100px;
  }

  .el-row {
    padding-left: 20px;
    margin-top: 5px;
    width: 100%;
  }

  .el-pagination {
    position: fixed;
    width: 400px;
    bottom: 0px;
    margin: 0px auto;
    right: 0px;
    left: 0px;
  }
</style>
<template>
  <div>
    <el-row class="el-row" :gutter="0">
      <el-col :md="1">
        <div style="line-height: 40px;">日期:</div>
      </el-col>
      <el-col :md="5">
        <div class="demo-input-suffix">
          <el-date-picker
            v-model="searchCondition.startDate"
            @change="loadData"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :md="5">
        <div class="demo-input-suffix">
          <el-date-picker
            v-model="searchCondition.endDate"
            @change="loadData"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
          </el-date-picker>
        </div>
      </el-col>
      <el-col :md="10">
        <div>
          <el-input placeholder="请输入内容" @keyup.enter.native="loadData" v-model="searchCondition.input4Search"
                    class="input-with-select">
            <el-select @change="loadData" v-model="searchCondition.searchType" slot="prepend" placeholder="请选择">
              <el-option label="全部" value="全部"></el-option>
              <el-option label="进货" value="进货"></el-option>
              <el-option label="出货" value="出货"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-button type="primary" @click="purchase">进货</el-button>
      <el-button type="primary" @click="sell">出货</el-button>
      <el-button type="primary" @click="deleteRecords">删除</el-button>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="pinming"
        label="品名"
        align="center">
      </el-table-column>
      <el-table-column
        prop="guige"
        label="规格"
        align="center">
      </el-table-column>
      <el-table-column
        prop="purPrice"
        label="进价"
        align="center">
      </el-table-column>
      <el-table-column
        prop="sellPrice"
        label="售价"
        align="center">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        align="center">
      </el-table-column>
      <el-table-column
        prop="number"
        label="数量"
        align="center">
      </el-table-column>
      <el-table-column
        :formatter="moneyFn"
        label="金额"
        align="center">
      </el-table-column>
      <el-table-column
        :formatter="maoLiFn"
        label="毛利"
        align="center">
      </el-table-column>
      <el-table-column
        :formatter="maoLiLvFn"
        label="毛利率"
        align="center">
      </el-table-column>
      <el-table-column
        prop="date"
        :formatter="dateFormat"
        label="日期"
        align="center">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.number"
      :page-sizes="page.sizes"
      :page-size="page.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total">
    </el-pagination>


    <el-dialog
      title="提示"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible"
      width="80%">
      <sellPage></sellPage>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>

    <el-dialog
      title="提示"
      :modal-append-to-body="false"
      :visible.sync="dialogVisible1"
      width="80%">
      <sellPage></sellPage>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import sellPage from './sell'
  import purchasePage from './purchase'

  export default {
    mounted: function () {
      this.loadData();
    },
    components: {
      sellPage
    },
    data() {
      return {
        page: {
          sizes: [9, 18, 36, 72],
          size: 9,
          number: 1,
          total: 0
        },
        searchCondition: {
          startDate: "",
          endDate: "",
          input4Search: "",
          searchType: "全部"
        },
        tableData: [],
        dialogVisible: false,
        dialogVisible1: false
      }
    },
    methods: {
      purchase: function () {
        this.dialogVisible = true;
      },
      sell: function () {
        this.dialogVisible1 = true;
      },
      deleteRecords: function () {
        debugger;
      },
      loadData() {
        var _this = this;
        var serverUrl = _this.$store.state.serverUrl;
        var url = serverUrl + '/tradeInfo/list?userId=1&page=' + this.page.number + '&size=' + this.page.size;
        axios.get(url, {params: _this.searchCondition})
          .then(function (result) {
            _this.tableData = result.data.data;
            _this.page.total = result.data.count;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      dateFormat: function (row, col) {
        var date = row[col.property];
        if (date == undefined) {
          return "";
        }
        return moment(date).format("YYYY-MM-DD");
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
      }
    }
  }

</script>
