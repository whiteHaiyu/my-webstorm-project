<template>
    <div class="container">
      <el-button type="info" class="add_user">新增日志</el-button>

      <el-table
        :data="tableData"
        border
        class="table">
        <el-table-column
          prop="name"
          align="center"
          label="日志名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="admin"
          align="center"
          label="发布人"
          width="320">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="日志内容"
          width="280">
        </el-table-column>
        <el-table-column
          prop="time"
          align="center"
          label="发布时间"
          width="320">
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="日志状态"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
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
            name: '王小虎',
            admin:1234567891011,
            content:1231231,
            time:'1990/1/1  23:58',
            status:12
          },{
              name: '王小虎',
              admin:1234567891011,
              content:1231231,
              time:'1990/1/1  23:58',
              status:12
          },{
              name: '王小虎',
              admin:1234567891011,
              content:1231231,
              time:'1990/1/1  23:58',
              status:12
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
