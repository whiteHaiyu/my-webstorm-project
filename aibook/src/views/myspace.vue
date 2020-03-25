<template>
  <div class="container">
    <el-button size="mini" type="primary" @click="myAddress">My Address</el-button>
    <el-table :data="orderList" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="story_name" label="name"></el-table-column>
      <el-table-column prop="price" label="price"></el-table-column>
      <el-table-column prop="order_time" label="time"></el-table-column>
      <el-table-column prop="state" label="state"></el-table-column>
      <el-table-column prop="receiver" label="reveiver"></el-table-column>
      <el-table-column prop="address" label="address"></el-table-column>
      <el-table-column label="Edit">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { userGetUserInfo, userUpdateAddress, userGetAddress } from "@/api/user";
import { orderGetOrderList, orderUpdateOrder } from "@/api/order";
export default {
  name: "myspace",
  data() {
    return {
      orderList: []
    };
  },
  created() {
    this.getInfo();
    this.getOrderlist();
  },
  methods: {
    // 获取用户个人信息
    getInfo() {
      let data = {
        token: this.$getToken()
      };
      userGetUserInfo(data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
      userGetAddress(data)
        .then(res => {
          console.log(res);
          console.log(JSON.stringify(res.address))
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 获取订单列表
    getOrderlist() {
      let data = {
        token: this.$getToken()
      };
      orderGetOrderList(data)
        .then(res => {
          console.log(res);
          this.orderList = res.orders;
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 编辑订单信息
    handleEdit(index, row) {
      console.log(row);
      let data = {
        token: this.$getToken(), // 管理员登陆时返回的字符串
        order_id: "string", // 随机生成的订单编号
        state: "paid", // 订单状态，可选，可以为 paid或者shipped或者received
        express_provider: "11111", // 快递商  可选
        express_number: "22222" // 快递单号 可选
      };
      orderUpdateOrder(data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    myAddress() {
      let data = {
        token: this.$getToken(), //登陆时返回的字符串
        address: "北京", //地址
        receiver: "w_hy", //收货人
        zipcode: "100000", //邮编
        phone: "010" //电话
      };
      userUpdateAddress(data)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='stylus' scoped></style>