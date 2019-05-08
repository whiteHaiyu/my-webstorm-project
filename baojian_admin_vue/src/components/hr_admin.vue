<template>
  <div class="container">
    <el-button type="info" class="add_user" @click="dialogVisible = true">添加人员</el-button>

    <el-dialog
      title="添加人员"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body='true'
      :before-close="handleClose">
      <el-form label-width="110px">
        <el-form-item label="员工名字：">
          <el-input v-model="newDot.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号：">
          <el-input v-model="newDot.idcard"></el-input>
        </el-form-item>
        <el-form-item label="手机号：">
          <el-input v-model="newDot.phone"></el-input>
        </el-form-item>
        <el-form-item label="人员类型：">
          <el-radio v-model="newDot.permission" label="城市主管">城市主管</el-radio>
          <el-radio v-model="newDot.permission" label="普通运维">普通运维</el-radio>
        </el-form-item>
        <el-form-item label="人员状态：">
          <el-select v-model="newDot.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click='createDot'>确 定</el-button>
      </span>
    </el-dialog>

    <div class="table">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column
          prop="name"
          align="center"
          label="员工名字"
          width="200">
        </el-table-column>
        <el-table-column
          prop="idcard"
          align="center"
          label="身份证号"
          width="320">
        </el-table-column>
        <el-table-column
          prop="phone"
          align="center"
          label="手机号"
          width="280">
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="人员状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="permission"
          align="center"
          label="人员身份"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        small
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :total=pageCount
        class="page"
      >
      </el-pagination>

    </div>


  </div>
</template>

<script>
  export default {
    name: "hr_admin",
    data() {
      return {
        dialogVisible: false,
        pageCount:10,
        tableData: [],
        postData: {
          username: '',
          token: '',
          page: 1,
          count: 10,
          timestamp: ''
        },

        newDot:{
          username:'',
          token:'',
          timestamp:'',
          name:'',
          idcard:'',
          phone:'',
          status:'空闲',
          permission:'普通运维'
        },

        delDot:{
          username:'',
          token:'',
          timestamp:'',
          id:''
        },

        options: [{
          value: '空闲',
          label: '空闲'
        }, {
          value: '加油工单中',
          label: '加油工单中'
        }, {
          value: '保养工单中',
          label: '保养工单中'
        }, {
          value: '调度工单中',
          label: '调度工单中'
        }, {
          value: '维修工单中',
          label: '维修工单中'
        }, {
          value: '预警工单中',
          label: '预警工单中'
        }],
      }
    },

    mounted() {
      this.initData()
    },

    methods: {
      handleDelete(index, row) {
        console.log(index, row)
        this.deleteDot(row.id)
        this.initData()
      },
      handleCurrentChange(val) {
        this.postData.page = val
        this.initData()
        console.log(this.postData.page)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },

      initData() {
        this.postData.username = this.$store.state.username
        this.postData.token = this.$store.state.token
        this.postData.timestamp = new Date().getTime()
        let sign = this.$md5(this.util.sortData(this.postData))
        let url = 'https://bms.gamewan.top/api/getworkers'
        let data = this.util.getString(this.postData) + '&sign=' + sign

        this.$axios.post(url, data).then(res => {
          console.log(res)
          this.tableData = res.data.workerInfos
          this.pageCount = res.data.workerscount
        }).catch(err => {
          console.log(err)
        })
      },

      deleteDot(val){
        this.delDot.username = this.$store.state.username
        this.delDot.token = this.$store.state.token
        this.delDot.timestamp = new Date().getTime()
        this.delDot.id = val
        let sign = this.$md5(this.util.sortData(this.delDot))
        let url = 'https://bms.gamewan.top/api/deleteworker'
        let data = this.util.getString(this.delDot) + '&sign=' + sign
        this.$axios.post(url, data).then(res => {
          this.$message({
            message: '删除网点成功',
            type: 'success'
          })
          this.initData()
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '服务器未知错误',
            type: 'error'
          })
        })
      },

      createDot(){
        this.dialogVisible = false

        this.newDot.username = this.$store.state.username
        this.newDot.token = this.$store.state.token
        this.newDot.timestamp = new Date().getTime()
        let sign = this.$md5(this.util.sortData(this.newDot))
        let url = 'https://bms.gamewan.top/api/insertworker'
        let data = this.util.getString(this.newDot) + '&sign=' + sign

        this.$axios.post(url,data).then(res => {
          console.log(res)
          if(res.data.code == 1000){
            this.$message({
              message: '添加人员成功',
              type: 'success'
            })
            this.initData()
          }else if(res.data.code == 1003){
            this.$message({
              message: '请填写所有数据',
              type: 'warning'
            })
          }else{
            this.$message({
              message: '服务器未知错误',
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '服务器未知错误',
            type: 'error'
          })
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
