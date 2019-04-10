<!--用户登录界面，输入账号密码登陆-->
<!--提供忘记密码功能，跳转到忘记密码页面-->

<template>
    <div>
      <p>账户：<input type="text" v-model="user"></p>
      <p>密码：<input type="password" v-model="pwd"></p>
      <p class="forget" @click="forget">忘记密码</p>
      <mt-button type="primary" @click="submit">确定</mt-button>
      <mt-button type="primary" @click="back">返回</mt-button>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui'

    export default {
        name: "login",
      data(){
        return{
          user:'',
          pwd:''
        }
      },
      methods:{
          submit(){
            if(this.user != '' && this.pwd != ''){
              this.$axios({
                method:'post',
                url:'http://localhost:3000/login',
                data:{
                  user:this.user,
                  pwd:this.pwd
                }
              }).then(res => {
                console.log(res)
                if(res.data == 'login success'){
                  this.$store.commit('change',this.user)
                  this.$router.push('/home')
                  Toast({
                    message:'登录成功',
                    duration:1000
                  })
                }else if(res.data == 'no user'){
                  Toast({
                    message:'当前账户不存在',
                    duration:1000
                  })
                  this.user = ''
                  this.pwd = ''
                }else if(res.data == 'pwd error'){
                  Toast({
                    message:'密码输入错误',
                    duration:1000
                  })
                  this.pwd = ''
                }else{
                  Toast({
                    message:'服务器挂掉了，稍后再试~',
                    duration:1000
                  })
                }
              }).catch(err => {
                console.log(err)
              })
            }else{
              Toast({
                message:'请输入完整账户名、密码',
                duration:1000
              })
            }
          },

          back(){
            this.$router.push('/')
          },

          forget(){
            this.$router.push('/forget')
          }
      }
    }
</script>

<style scoped>
.forget{
  color: blue;
  text-decoration: underline;
}
</style>
