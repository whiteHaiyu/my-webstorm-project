<!--启动展示页面，标题、登录选项、注册选项-->

<template>
    <div>
      <p>欢迎使用医疗信息记录系统</p>
      <mt-button type="primary" @click="login">登录</mt-button>
      <mt-button type="default" @click="signin">注册</mt-button>
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

</style>
