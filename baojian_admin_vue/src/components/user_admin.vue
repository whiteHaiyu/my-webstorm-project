<template>
  <div class="container">
<!--    <el-button type="info" class="add_user">新增用户</el-button>-->

    <div class="table">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column
          prop="username"
          align="center"
          label="用户名"
          :width="500">
        </el-table-column>
        <el-table-column
          prop="email"
          align="center"
          label="邮箱">
        </el-table-column>
      </el-table>
<!--      <el-pagination-->
<!--        small-->
<!--        layout="prev, pager, next"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :total="50"-->
<!--        class="page"-->
<!--      >-->
<!--      </el-pagination>-->

    </div>


  </div>
</template>

<script>
  export default {
    name: "user_admin",
    data() {
      return {
        tableData: [],
        postData: {
          username: '',
          token: '',
          page: 1,
          count: 10,
          timestamp: ''
        }
      }
    },

    mounted() {
      this.initData()
    },

    methods: {
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleCurrentChange(val) {
        this.postData.page = val
      },
      initData() {
        this.postData.username = this.$store.state.username
        this.postData.token = this.$store.state.token
        this.postData.timestamp = new Date().getTime()
        let sign = this.$md5(this.util.sortData(this.postData))
        let url='https://bms.gamewan.top/api/getusers'
        let data=this.util.getString(this.postData)+'&sign='+sign

        this.$axios.post(url,data).then(res => {
          console.log(res)
          this.tableData = res.data.userInfos
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>
  .container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .add_user {
    position: absolute;
    left: 3%;
    top: 20px;
  }

  .table {
    width: 94%;
    position: absolute;
    left: 3%;
    top: 80px;
  }

  .page {
    margin: 20px auto;
    text-align: center;
  }
</style>
