<!--注册界面，输入账户，两次确认密码，注册邮箱-->
<!--账号不能重复，每个邮箱只能使用一次-->

<template>
    <div>
      <div class="contain">
        <img src="../assets/close.png" class="close" @click="back">

        <p class="login_title">注册</p>
        <p class="detail_title">最了解您身体状况的健康管家</p>

        <img src="../assets/login_bg.png" class="background">
        <div class="content">
          <div class="user_contain">
            <input type="text" class="user" v-model="user"  placeholder="请输入用户名">
          </div>
          <div class="pwd_contain">
            <input type="password" ref="pwd" class="pwd" v-model="pwd" placeholder="请输入密码">
          </div>
          <div class="repwd_contain">
            <input type="password" ref="pwd" class="repwd" v-model="repwd" placeholder="请再次确认密码">
          </div>
          <div class="mail_contain">
            <input type="text" ref="pwd" class="mail" v-model="mail" placeholder="请输入邮箱">
          </div>
          <div class="login" @click="submit">注册</div>
        </div>

        <p class="copyright">copyright © w_haiyu</p>
      </div>

    </div>
</template>

<script>
  import {Toast} from 'mint-ui'

    export default {
        name: "signin",
      data(){
          return{
            user:'',
            pwd:'',
            repwd:'',
            mail:''
          }
      },
      methods:{
          submit(){
            if(this.user != '' && this.pwd != '' && this.repwd != '' && this.mail != '')
            {
              if(this.pwd !== this.repwd){
                Toast({
                  message:'两次密码不一致',
                  duration:1000
                })
              }else {
                this.$axios({
                  method: 'post',
                  url: 'http://localhost:3000/signin',
                  data: {
                    user: this.user,
                    pwd: this.pwd,
                    mail: this.mail
                  }
                }).then(res => {
                  console.log(res)
                  if (res.data.info == 'signin success') {
                    this.$store.commit('change', this.user)
                    this.$router.push('/guide')
                    Toast({
                      message:'注册成功',
                      duration:1000
                    })
                  } else {
                    Toast({
                      message:'账号/邮箱已被注册',
                      duration:1000
                    })
                  }
                }).catch(err => {
                  console.log(err)
                })
              }
            }else{
              Toast({
                message:'请输入完整信息',
                duration:1000
              })
            }
          },

          back(){
            this.$router.push('/')
          }
      }
    }
</script>

<style scoped>
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
    height: 8rem;
    width: 6.7rem;
    background-color: #fff;
    position: absolute;
    left: 0.4rem;
    top: 3.8rem;
    border-radius: 0.1rem;
    box-shadow: 0px 0px 10px rgba(97,146,255,0.18);
    z-index: 2;
  }

  .user_contain{
    position: absolute;
    top: 0.8rem;
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
    top: 2.2rem;
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

  .repwd_contain{
    position: absolute;
    top: 3.6rem;
    left: 0.3rem;
    background-color: rgb(245, 245, 245);
    width: 6.1rem;
    height: 0.75rem;
    border-radius: 0.75rem;
  }
  .repwd{
    border: none;
    outline: none;
    position: absolute;
    top: 0.02rem;
    left: 0.45rem;
    background-color: rgb(245, 245, 245);
    height: 0.7rem;
    width: 5.2rem;
  }

  .mail_contain{
    position: absolute;
    top: 5rem;
    left: 0.3rem;
    background-color: rgb(245, 245, 245);
    width: 6.1rem;
    height: 0.75rem;
    border-radius: 0.75rem;
  }
  .mail{
    border: none;
    outline: none;
    position: absolute;
    top: 0.02rem;
    left: 0.45rem;
    background-color: rgb(245, 245, 245);
    height: 0.7rem;
    width: 5.2rem;
  }



  .login{
    position: absolute;
    top: 6.4rem;
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
