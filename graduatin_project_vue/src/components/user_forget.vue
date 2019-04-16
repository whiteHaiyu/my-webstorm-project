<!--忘记密码页面，输入注册时邮箱，账号密码发送到邮箱-->

<template>
  <div class="contain">
    <img src="../assets/close.png" class="close" @click="back">

    <p class="login_title">找回密码</p>
    <p class="detail_title">最了解您身体状况的健康管家</p>

    <img src="../assets/login_bg.png" class="background">
    <div class="content">
      <div class="mail_contain">
        <input type="text" class="mail" v-model="mail" placeholder="请输入注册邮箱">
      </div>
      <div class="confirm" @click="submit">确定</div>
    </div>

    <p class="copyright">copyright © w_haiyu</p>
  </div>

</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: "forget",
    data() {
      return {
        mail: ''
      }
    },

    methods: {
      submit() {
        if (this.mail != '') {
          this.$axios({
            method: 'post',
            url: 'http://localhost:3000/findpwd',
            data: {
              mail: this.mail
            }
          }).then(res => {
            if (res.data == 'findpwd success') {
              Toast({
                message: '账号密码已发送到邮箱'
              })
              this.$router.push('/')
            } else {
              Toast({
                message: '当前邮箱未注册',
                duration: 1000
              })
            }
          }).catch(err => {
            console.log(err)
          })
        }
      },

      back() {
        this.$router.push('/')
      }
    }
  }
</script>

<style scoped>
  .close {
    height: 0.6rem;
    width: 0.6rem;
    position: absolute;
    left: 0.45rem;
    top: 0.8rem;
    z-index: 2;
  }

  .login_title {
    color: white;
    font-size: 28px;
    position: absolute;
    top: 2rem;
    left: 0.45rem;
    z-index: 3;
  }

  .detail_title {
    color: white;
    font-size: 16px;
    position: absolute;
    left: 0.45rem;
    top: 3rem;
    z-index: 3;
  }

  .background {
    width: 7.5rem;
    height: 6.2rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  .content {
    height: 4.85rem;
    width: 6.7rem;
    background-color: #fff;
    position: absolute;
    left: 0.4rem;
    top: 4.25rem;
    border-radius: 0.1rem;
    box-shadow: 0px 0px 10px rgba(97, 146, 255, 0.18);
    z-index: 2;
  }

  .mail_contain {
    position: absolute;
    top: 1.25rem;
    left: 0.3rem;
    background-color: rgb(245, 245, 245);
    width: 6.1rem;
    height: 0.75rem;
    border-radius: 0.75rem;
  }

  .mail {
    border: none;
    outline: none;
    position: absolute;
    top: 0.02rem;
    left: 0.45rem;
    background-color: rgb(245, 245, 245);
    height: 0.7rem;
    width: 5.2rem;
  }

  .confirm {
    position: absolute;
    top: 2.85rem;
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

  .copyright {
    font-size: 14px;
    color: rgb(168, 168, 168);
    position: fixed;
    bottom: 1rem;
    width: 7.5rem;
    text-align: center;
  }
</style>
