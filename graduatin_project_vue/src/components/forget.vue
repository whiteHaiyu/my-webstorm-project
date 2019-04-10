<!--忘记密码页面，输入注册时邮箱，账号密码发送到邮箱-->

<template>
    <div>
      <p>忘记密码</p>
      <p>邮箱：<input type="text"></p>
      <mt-button type="primary" @click="submit">确定</mt-button>
      <mt-button type="primary" @click="back">取消</mt-button>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'

    export default {
        name: "forget",
      data(){
          return{
            mail:''
          }
      },

      methods:{
          submit(){
            if(this.mail != ''){
              this.$axios({
                method:'post',
                url:'http://localhost:3000/findpwd',
                data:{
                  mail:this.mail
                }
              }).then(res => {
                if(res.data == 'findpwd success'){
                  Toast({
                    message:'账号密码已发送到邮箱'
                  })
                  this.$router.push('/')
                }else{
                  Toast({
                    message:'当前邮箱未注册',
                    duration:1000
                  })
                }
              }).catch(err => {
                console.log(err)
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
