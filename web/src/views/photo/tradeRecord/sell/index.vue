<style>
  .el-select {
    width: 185px;
  }

  .el-select .el-input {
    width: 185px;
  }
</style>
<template>
  <div>
    <el-form ref="sellForm" :inline="true" label-width="100px" class="demo-form-inline">
      <el-form-item label="品名：">
        <el-select v-model="goodsId" filterable @change="selectFn" placeholder="请选择">
          <el-option
            v-for="item in goodsList"
            :key="item.id"
            :label="item.pinming+'-----'+item.guige"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="出货日期：">
        <div class="block">
          <template>
            <div class="block">
              <el-date-picker v-model="date" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
              </el-date-picker>
            </div>
          </template>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="autoInputFun">自动填入</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </el-form-item>
      <br>
      <el-form-item label="出货总数：">
        <el-input v-model="form.sellTotalNum" placeholder="出货总数"></el-input>
      </el-form-item>
      <el-form-item label="出货单价：">
        <el-input v-model="form.sellPerPrice" placeholder="出货单价"></el-input>
      </el-form-item>
      <el-form-item label="出货总价：">
        <el-input v-model="form.sellTotalMoney" placeholder="出货总价"></el-input>
      </el-form-item>
    </el-form>
    <el-table
      :data="sellList"
      style="width: 100%">
      <el-table-column
        label="进货日期"
        width="160">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="进货价格"
        width="160">
        <template slot-scope="scope">
          <el-input v-model="scope.row.price" placeholder="进货价格"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="进货数量"
        width="160">
        <template slot-scope="scope">
          <el-input v-model="scope.row.number" placeholder="审批人"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="库存"
        width="160">
        <template slot-scope="scope">
          <el-input v-model="scope.row.nowNumber" placeholder="审批人"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="出售价格"
        width="160">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sellPrice" placeholder="审批人"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="出售数量"
        width="160">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sellNumber" placeholder="审批人"></el-input>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作">-->
      <!--<template slot-scope="scope">-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--@click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
      <!--<el-button-->
      <!--size="mini"-->
      <!--type="danger"-->
      <!--@click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios'
  import request from '@/utils/request'
  export default {

    mounted: function () {
      var _this = this;
      var serverUrl = _this.$store.state.serverUrl;
      axios.get(serverUrl + '/goodsInfo/list?userId=1')
        .then(function (response) {
          _this.goodsList = response.data.data;
        })
        .catch(function (error) {
          console.log(error);
        });


      var data = request({
        url: serverUrl + '/goodsInfo/list?userId=1',
        method: 'get',
        data: {
          userId:1
        }
      })
      debugger
      // this.loadData();
    },
    data() {
      return {
        goodsList: [],
        sellList: [],
        goodsId: "",
        date: "",
        form: {
          sellTotalNum: 0,
          sellPerPrice: 0,
          sellTotalMoney: 0
        },
        tableData: []
      }
    },
    methods: {
      selectFn: function () {
        this.loadData();
      },
      loadData() {
        var _this = this;
        var serverUrl = _this.$store.state.serverUrl;
        axios.get(serverUrl + '/tradeInfo/jinhuoList?userId=1&id=' + this.goodsId)
          .then(function (response) {
            _this.sellList = response.data.filter(function (a) {
              if (a.nowNumber > 0) return a
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      resetForm() {
        this.date = "";
        this.form.sellTotalNum = 0;
        this.form.sellPerPrice = 0;
        this.form.sellTotalMoney = 0;
      },
      submitForm: function () {
        var _this = this;
        var sellList = this.sellList;
        var serverUrl = _this.$store.state.serverUrl;
        for (var index in this.sellList) {
          if (sellList[index].sellNumber > 0 && sellList[index].sellNumber <= sellList[index].nowNumber) {
            axios.post(serverUrl + '/tradeInfo/chuHuoSaveOrUpdate', {
              userId: 1,
              date: this.date,
              data: this.sellList[index],
              goodsId: this.goodsId
            })
              .then(function (response) {
                if (response.data == "success") {
                  _this.$message({
                    type: 'info',
                    message: `添加成功`
                  });
                  _this.resetForm();
                  _this.loadData();
                }
                // console.log(response.data);
                // sellApp.sellList = response.data;
              })
              .catch(function (error) {
                console.log(error);
              });
          }

        }

      },
      autoInputFun() {
        var _this = this;
        var totalNum_PerPrice = (_this.form.sellTotalNum != 0 && _this.form.sellPerPrice != 0);
        var totalNumber_Money = (_this.form.sellTotalNum != 0 && _this.form.sellTotalMoney != 0);
        var perPrice_Money = (_this.form.sellPerPrice != 0 && _this.form.sellTotalMoney != 0);
        var totalNum_perPrice_Money = (_this.form.sellTotalNum != 0 && _this.form.sellPerPrice != 0 && _this.form.sellTotalMoney != 0);

        if (totalNum_perPrice_Money) {
          if (_this.form.sellTotalNum != _this.form.sellTotalMoney / _this.form.sellPerPrice) {
            alert("填写数据有误！");
          }
        } else if (totalNumber_Money) {
          _this.form.sellPerPrice = _this.form.sellTotalMoney / _this.form.sellTotalNum;
        } else if (perPrice_Money) {
          _this.form.sellTotalNum = _this.form.sellTotalMoney / _this.form.sellPerPrice;
        } else if (totalNum_PerPrice) {
          _this.form.sellTotalMoney = _this.form.sellTotalNum * _this.form.sellPerPrice;
        } else {
          alert("请至少填写两个数据");
        }

        var length = _this.sellList.length;
        var sellTotalNum = _this.form.sellTotalNum;
        for (var i = 0; i < length; i++) {
          if (sellTotalNum >= 0) {
            if (sellTotalNum < _this.sellList[i].nowNumber) {
              _this.sellList[i].sellNumber = sellTotalNum;
              _this.sellList[i].sellPrice = _this.form.sellPerPrice;
              sellTotalNum -= sellTotalNum;
            } else {
              _this.sellList[i].sellNumber = _this.sellList[i].nowNumber;
              _this.sellList[i].sellPrice = sellTotalNum;
              sellTotalNum -= _this.sellList[i].nowNumber;
            }
          }
        }
        if (sellTotalNum > 0) {
          alert("填写的数量过大~");
        }
      },
      totalNumChange() {
        var _this = this;
        var length = _this.sellList.length;
        var sellTotalNum = _this.form.sellTotalNum;
        for (var i = 0; i < length; i++) {
          if (sellTotalNum >= 0) {
            if (sellTotalNum < _this.sellList[i].nowNumber) {
              _this.sellList[i].sellNumber = sellTotalNum;
              sellTotalNum -= sellTotalNum;
            } else {
              _this.sellList[i].sellNumber = _this.sellList[i].nowNumber;
              sellTotalNum -= _this.sellList[i].nowNumber;
            }
          }
        }
        if (sellTotalNum > 0) {
          alert("填写的数量过大~");
        }
      },
      totalMoneyChange() {
        var _this = this;
        var length = _this.sellList.length;
        var sellTotalNum = _this.form.sellTotalNum;
        for (var i = 0; i < length; i++) {
          if (sellTotalNum >= 0) {
            if (sellTotalNum < _this.sellList[i].nowNumber) {
              _this.sellList[i].sellNumber = sellTotalNum;
              sellTotalNum -= sellTotalNum;
            } else {
              _this.sellList[i].sellNumber = _this.sellList[i].nowNumber;
              sellTotalNum -= _this.sellList[i].nowNumber;
            }
          }
        }
        if (sellTotalNum > 0) {
          alert("填写的数量过大~");
        }
      },
      perPriceChange() {
        var _this = this;
        var length = _this.sellList.length;
        var sellTotalNum = _this.form.sellTotalNum;
        for (var i = 0; i < length; i++) {
          if (sellTotalNum >= 0) {
            if (sellTotalNum < _this.sellList[i].nowNumber) {
              _this.sellList[i].sellNumber = sellTotalNum;
              sellTotalNum -= sellTotalNum;
            } else {
              _this.sellList[i].sellNumber = _this.sellList[i].nowNumber;
              sellTotalNum -= _this.sellList[i].nowNumber;
            }
          }
        }
        if (sellTotalNum > 0) {
          alert("填写的数量过大~");
        }
      },
      nextPage: function () {
        var _this = this;
        _this.page.number++;

      },
      handleSizeChange(val) {
        this.page.size = val;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.page.number = val;
        this.loadData();
      }
    }
  }

</script>
