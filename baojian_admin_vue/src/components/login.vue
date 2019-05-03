<!--登录界面-->
<!--测试账号：test-->
<!--测试密码：123-->

<template>
    <div class="container">
      <div class="table">
        <div class="user"><input type="text" class="input" placeholder="账号" v-model="postData.username"></div>
        <div class="pwd"><input type="password" class="input" placeholder="密码" v-model="postData.password"></div>
        <div class="login" @click="login">Login</div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return{
            postData:{
              username:'',
              password:'',
              timestamp:''
            }
          }
      },

      mounted(){
        console.log('欢迎使用保健管理系统！')
      },

      methods:{
          login(){
            this.postData.timestamp = new Date().getTime()
            let sign = this.$md5(this.util.sortData(this.postData))
            // console.log(sign)
            // console.log(this.util.sortData(this.postData))
            let url='https://bms.gamewan.top/api/login'
            let data=this.util.getString(this.postData)+'&sign='+sign
            // console.log(data)
            this.$axios.post(url,data).then(res => {
              // console.log(res)
              if(res.data.code == 1000){
                this.$message({
                  message: '登录成功',
                  type: 'success'
                })
                // console.log(res.data.userInfo)
                this.$store.commit('loginStatus',res.data.userInfo.username)
                this.$store.commit('setToken',res.data.userInfo.token)
                // console.log(this.$store.state.loginState)
                this.$router.push('/admin')
              }else{
                this.$message({
                  message: '账号或密码错误',
                  type: 'error'
                })
                this.postData.username = ''
                this.postData.password = ''
              }
            }).catch(err =>{
              console.log(err)
              this.$message({
                message: '服务器挂了，稍后再试~',
                type: 'warning'
              })
            })
          }
      }
    }
</script>

<style scoped>

  .container{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background: url("../assets/background.png") no-repeat  center;
    background-size:cover;
  }

  .table{
    width: 450px;
    height: 350px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    background-color: rgba(255,255,255,0.35);
    border: 1px solid #FFF;
    border-radius: 5px;
    box-shadow: rgba(135,135,235,0.3) 0px 0px 5px 5px ;
  }

  .user,.pwd{
    width: 300px;
    height: 50px;
    background-color:rgba(255,255,255,0.6);

  }

  .user{
    position: absolute;
    top: 50px;
    left: 75px;
  }

  .pwd{
    position: absolute;
    top: 150px;
    left: 75px;
  }

  .input{
    width: 100%;
    height: 100%;
    line-height: 100%;
    font-size: 20px;
    background-color: rgba(255,255,255,0);
    border: none;
    padding-left: 10px;
    outline:none;
  }

  .login{
    width: 300px;
    height: 50px;
    background-color:rgba(33, 40, 59);
    position: absolute;
    top: 250px;
    left: 75px;
    color: white;
    text-align: center;
    line-height: 50px;

  }

</style>
