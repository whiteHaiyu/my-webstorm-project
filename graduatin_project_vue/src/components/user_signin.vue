<!--注册界面，输入账户，两次确认密码，注册邮箱-->
<!--账号不能重复，每个邮箱只能使用一次-->

<template>
    <div>
      <p>账户：<input type="text" v-model="user"></p>
      <p>密码：<input type="password" v-model="pwd"></p>
      <p>确认密码：<input type="password" v-model="repwd"></p>
      <p>邮箱：<input type="text" v-model="mail"></p>
      <mt-button type="primary" @click="submit">确认</mt-button>
      <mt-button type="primary" @click="back">返回</mt-button>
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
                    this.$router.push('/home')
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

</style>
