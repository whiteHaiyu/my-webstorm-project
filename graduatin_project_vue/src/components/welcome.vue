<!--启动展示页面，标题、登录选项、注册选项-->

<template>
  <div class="contain">

    <p class="login_title">超级医疗信息分享系统</p>
    <p class="detail_title">最了解您身体状况的健康管家</p>

    <img src="../assets/login_bg.png" class="background">
    <div class="content">
      <div class="login" @click="login">登录</div>
      <div class="signin" @click="signin">注册</div>
    </div>

    <p class="copyright">copyright © w_haiyu</p>
  </div>


<!--    <div class="container">-->
<!--      <p class="title">欢迎使用医疗信息记录系统</p>-->
<!--      <button type="primary" @click="login">登录</button>-->
<!--      <button type="default" @click="signin">注册</button>-->
<!--    </div>-->
</template>

<script>

    export default {
      name: "welcome",
      data(){
          return{
 
          }
      },

      methods:{
        login(){
          this.$router.push('/login')
        },

        signin(){
          this.$router.push('/signin')
        },

      }
    }
</script>

<style scoped>
  .contain{
    height: 100%;
    background-color: rgb(252, 252, 252);
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
    height: 4.85rem;
    width: 6.7rem;
    background-color: #fff;
    position: absolute;
    left: 0.4rem;
    top: 4.25rem;
    border-radius: 0.1rem;
    box-shadow: 0px 0px 10px rgba(97,146,255,0.18);
    z-index: 2;
  }


  .login{
    position: absolute;
    top: 1.5rem;
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

  .signin{
    position: absolute;
    top: 2.9rem;
    left: 0.3rem;
    background-color: rgb(238, 238, 238);
    width: 6.1rem;
    height: 0.75rem;
    border-radius: 0.75rem;
    line-height: 0.75rem;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: rgb(192, 192, 192);
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
