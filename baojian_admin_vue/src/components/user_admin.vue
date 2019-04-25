<template>
    <div class="container">
      <el-button type="info" class="add_user">新增用户</el-button>

      <el-table
        :data="tableData"
        border
        class="table">
        <el-table-column
          prop="user"
          align="center"
          label="用户名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="id"
          align="center"
          label="身份证"
          width="320">
        </el-table-column>
        <el-table-column
          prop="tel"
          align="center"
          label="手机号"
          width="280">
        </el-table-column>
        <el-table-column
          prop="last_time"
          align="center"
          label="上次用车时间"
          width="320">
        </el-table-column>
        <el-table-column
          prop="count"
          align="center"
          label="总用车次数"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              :disabled="scope.row.tel=='1231231'?false:true"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
        name: "user_admin",
      data() {
        return {
          tableData: [
          {
            user: '王小虎',
            id:1234567891011,
            tel:123123,
            last_time:'1990/1/1  23:58',
            count:12
          },{
              user: '王小虎',
              id:1234567891011,
              tel:1231231,
              last_time:'1990/1/1  23:58',
              count:12
          },{
              user: '王小虎',
              id:1234567891011,
              tel:1231231,
              last_time:'1990/1/1  23:58',
              count:12
          }
          ]
        }
      },

    methods:{
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
    }
</script>

<style scoped>
  .container{
    width: 100%;
    height: 100%;
    position: relative;
  }

  .add_user{
    position: absolute;
    left: 3%;
    top: 20px;
  }

  .table{
    width: 94%;
    position: absolute;
    left: 3%;
    top: 80px;
  }
</style>
