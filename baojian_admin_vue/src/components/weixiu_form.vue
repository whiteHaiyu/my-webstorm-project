<template>
  <div class="container">
    <el-button type="info" class="add_user" @click="dialogVisible = true">新建工单</el-button>

    <el-dialog
      title="新建工单"
      :visible.sync="dialogVisible"
      width="30%"
      :append-to-body='true'
      :before-close="handleClose">
      <el-form label-width="110px">
        <el-form-item label="车牌号：">
          <el-input v-model="newDot.carnumber"></el-input>
        </el-form-item>
        <el-form-item label="委托人：">
          <el-input v-model="newDot.principal"></el-input>
        </el-form-item>
        <el-form-item label="工单状态：">
          <el-radio v-model="newDot.status" label='待完成'>待完成</el-radio>
          <el-radio v-model="newDot.status" label='已委托'>已委托</el-radio>
          <el-radio v-model="newDot.status" label='已完成'>已完成</el-radio>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible = false">取 消</el-button>
       <el-button type="primary" @click='createDot'>确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="修改工单"
      :visible.sync="dialogVisible2"
      width="30%"
      :append-to-body='true'
      :before-close="handleClose">
      <el-form label-width="110px">
        <el-form-item label="车牌号：">
          <el-input v-model="modifyDot.carnumber"></el-input>
        </el-form-item>
        <el-form-item label="委托人：">
          <el-input v-model="modifyDot.principal"></el-input>
        </el-form-item>
        <el-form-item label="工单状态：">
          <el-radio v-model="modifyDot.status" label='待完成'>待完成</el-radio>
          <el-radio v-model="modifyDot.status" label='已委托'>已委托</el-radio>
          <el-radio v-model="modifyDot.status" label='已完成'>已完成</el-radio>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
       <el-button @click="dialogVisible2 = false">取 消</el-button>
       <el-button type="primary" @click='modifyData(modifyId)'>确 定</el-button>
      </span>
    </el-dialog>

    <div class="table">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column
          prop="carnumber"
          align="center"
          label="车牌号"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createtime"
          align="center"
          label="创建时间"
          width="320">
        </el-table-column>
        <el-table-column
          prop="principal"
          align="center"
          label="委托人"
          width="280">
        </el-table-column>
        <el-table-column
          prop="status"
          align="center"
          label="工单状态"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="success"
              @click="handleModify(scope.$index, scope.row)">修改
            </el-button>

            <el-button
              size="mini"
              type="danger"
              :disabled="$store.state.username == 'admin' ? false:true"
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
    name: "weixiu_form",
    data() {
      return {
        modifyId:'',
        dialogVisible: false,
        dialogVisible2: false,
        pageCount:10,
        tableData: [],
        postData: {
          username: '',
          token: '',
          page: 1,
          count: 10,
          timestamp: '',
          type:3
        },

        newDot:{
          username:'',
          token:'',
          timestamp:'',
          carnumber:'',
          principal:'',
          status:'待完成',
          type:3
        },

        modifyDot:{
          username:'',
          token:'',
          timestamp:'',
          carnumber:'',
          principal:'',
          status:'',
          type:3
        },

        delDot:{
          username:'',
          token:'',
          timestamp:'',
          id:''
        }
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
      handleModify(index, row) {
        console.log(index, row)
        this.dialogVisible2 = true
        this.modifyId = row.id
        this.modifyDot.carnumber = row.carnumber
        this.modifyDot.principal = row.principal
        this.modifyDot.status = row.status
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

      modifyData(val){
        this.dialogVisible2 = false

        this.modifyDot.username = this.$store.state.username
        this.modifyDot.token = this.$store.state.token
        this.modifyDot.timestamp = new Date().getTime()
        let sign = this.$md5(this.util.sortData(this.modifyDot))
        let url = 'https://bms.gamewan.top/api/insertworkorder'
        let data = this.util.getString(this.modifyDot) + '&sign=' + sign
        this.$axios.post(url,data).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '服务器未知错误',
            type: 'error'
          })
        })

        this.delDot.username = this.$store.state.username
        this.delDot.token = this.$store.state.token
        this.delDot.timestamp = new Date().getTime()
        this.delDot.id = val
        let sign2 = this.$md5(this.util.sortData(this.delDot))
        let url2 = 'https://bms.gamewan.top/api/deleteworkorder'
        let data2 = this.util.getString(this.delDot) + '&sign=' + sign2
        this.$axios.post(url2, data2).then(res => {
          this.initData()
          this.$message({
            message: '修改工单成功',
            type: 'success'
          })
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '服务器未知错误',
            type: 'error'
          })
        })
      },

      initData() {
        this.postData.username = this.$store.state.username
        this.postData.token = this.$store.state.token
        this.postData.timestamp = new Date().getTime()
        let sign = this.$md5(this.util.sortData(this.postData))
        let url = 'https://bms.gamewan.top/api/getworkorders'
        let data = this.util.getString(this.postData) + '&sign=' + sign

        this.$axios.post(url, data).then(res => {
          console.log(res)
          this.tableData = res.data.workOrderInfos
          this.pageCount = res.data.workOrderCount
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
        let url = 'https://bms.gamewan.top/api/deleteworkorder'
        let data = this.util.getString(this.delDot) + '&sign=' + sign
        this.$axios.post(url, data).then(res => {
          this.initData()
          this.$message({
            message: '删除网点成功',
            type: 'success'
          })
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
        let url = 'https://bms.gamewan.top/api/insertworkorder'
        let data = this.util.getString(this.newDot) + '&sign=' + sign
        console.log(data)

        this.$axios.post(url,data).then(res => {
          console.log(res)
          if(res.data.code == 1000){
            this.$message({
              message: '新建网点成功',
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
