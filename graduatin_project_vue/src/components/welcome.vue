<!--启动展示页面，标题、登录选项、注册选项-->

<template>
    <div class="container">
      <p class="title">欢迎使用医疗信息记录系统</p>
      <button type="primary" @click="login">登录</button>
      <button type="default" @click="signin">注册</button>
    </div>
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
  .container{
    position: relative;
  }

  .title{
    font-size: 16px;
    position: absolute;
    top: 3rem;
  }
</style>
