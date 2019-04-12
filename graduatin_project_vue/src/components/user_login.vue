<!--用户登录界面，输入账号密码登陆-->
<!--提供忘记密码功能，跳转到忘记密码页面-->

<!--未完成功能，输入密码是否明文-->

<template>
    <div class="contain">
      <img src="../assets/close.png" class="close" @click="back">

      <p class="login_title">登录</p>
      <p class="detail_title">最了解您身体状况的健康管家</p>

      <img src="../assets/login_bg.png" class="background">
      <div class="content">
        <div class="user_contain">
          <input type="text" class="user" v-model="user"  placeholder="请输入用户名">
        </div>
        <div class="pwd_contain">
          <input type="password" ref="pwd" class="pwd" v-model="pwd" placeholder="请输入密码">
        </div>
        <p class="forget" @click="forget">忘记密码?</p>
        <div class="login" @click="submit">确认登录</div>
      </div>

      <p class="copyright">copyright © w_haiyu</p>
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
  .contain{
    height: 100%;
    background-color: rgb(252, 252, 252);
  }

  .close{
    height: 0.6rem;
    width: 0.6rem;
    position: absolute;
    left: 0.45rem;
    top: 0.8rem;
    z-index: 2;
  }

  .login_title{
    color: white;
    font-size: 28px;
    position: absolute;
    top: 2rem;
    left: 0.45rem;
    z-index: 3;
  }

  .detail_title{
    color: white;
    font-size: 16px;
    position: absolute;
    left: 0.45rem;
    top: 3rem;
    z-index: 3;
  }

  .background{
    width: 7.5rem;
    height: 6.2rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  .content{
    height: 6.6rem;
    width: 6.7rem;
    background-color: #fff;
    position: absolute;
    left: 0.4rem;
    top: 4.25rem;
    border-radius: 0.1rem;
    box-shadow: 0px 0px 10px rgba(97,146,255,0.18);
    z-index: 2;
  }

  .user_contain{
    position: absolute;
    top: 1rem;
    left: 0.3rem;
    background-color: rgb(245, 245, 245);
    width: 6.1rem;
    height: 0.75rem;
    border-radius: 0.75rem;
  }
  .user{
    border: none;
    outline: none;
    position: absolute;
    top: 0.02rem;
    left: 0.45rem;
    background-color: rgb(245, 245, 245);
    height: 0.7rem;
    width: 5.2rem;
  }

  .pwd_contain{
    position: absolute;
    top: 2.55rem;
    left: 0.3rem;
    background-color: rgb(245, 245, 245);
    width: 6.1rem;
    height: 0.75rem;
    border-radius: 0.75rem;
  }
  .pwd{
    border: none;
    outline: none;
    position: absolute;
    top: 0.02rem;
    left: 0.45rem;
    background-color: rgb(245, 245, 245);
    height: 0.7rem;
    width: 5.2rem;
  }

  .forget{
    position: absolute;
    right: 0.45rem;
    top: 3.75rem;
    font-size: 14px;
    color: rgb(167, 167, 167);
  }

  .login{
    position: absolute;
    top: 4.75rem;
    left: 0.3rem;
    background-color: rgb(129, 163, 234);
    width: 6.1rem;
    height: 0.75rem;
    border-radius: 0.75rem;
    line-height: 0.75rem;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: white;
  }

  .copyright{
    font-size: 14px;
    color: rgb(168, 168, 168);
    position: fixed;
    bottom: 1rem;
    width: 7.5rem;
    text-align: center;
  }
</style>
