<template>
  <div>
    <div class="container">
      <div class='login-card'>
        <div class="login-tabs">
          <div :class="{'login-tabs-item':true,'active':activeBtn == 'login'}" @click="activeBtn = 'login'">{{ $t('user.login') }}</div>
          <div :class="{'login-tabs-item':true,'active':activeBtn == 'register'}" @click="activeBtn = 'register'">{{ $t('user.register') }}</div>
        </div>
        <div class="login-content" v-if="activeBtn == 'login'">
          <div class="login-content-item"><span>{{ $t('user.username') }}</span><input type="text" v-model="login.user_name"></div>
          <div class="login-content-item"><span>{{ $t('user.password') }}</span><input type="password" v-model="login.password"></div>
        </div>
        <div class="login-content" v-if="activeBtn == 'register'">
          <div class="login-content-item"><span>{{ $t('user.username') }}</span><input type="text" v-model="register.user_name"></div>
          <div class="login-content-item"><span>{{ $t('user.password') }}</span><input type="password" v-model="register.password"></div>
          <div class="login-content-item"><span>{{ $t('user.email') }}</span><input type="text" v-model="register.email"></div>
          <div class="login-content-item"><span>{{ $t('user.phone') }}</span><input type="text" v-model="register.phone"></div>
        </div>
        <div class="login-submit" @click="submit">{{ $t('user.submit') }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { userRegister, userLogin } from "@/api/user";

export default {
  name: "login",
  data: () => ({
    login: {
      user_name: "",
      password: ""
    },
    register: {
      user_name: "",
      password: "",
      email: '',
      phone: ''
    },
    activeBtn:'login',
  }),
  created(){
      console.log(this.$getToken())
  },
  methods: {
    submit(){
      switch(this.activeBtn){
        case 'login':
          this.doLogin()
          break
        case 'register':
          this.doRegister()
          break
        default:
          return
      }
    },
    // 登录
    doLogin() {
      console.log(this.login);
      userLogin(this.login)
        .then(res => {
          console.log(res);
          if (res.status == "succeed") {
            this.$message.success("login success");
            this.$store.commit("SET_LOGIN", true)
            this.$setToken(res.token)
            setTimeout(() => {
              this.$router.push('/homepage')
            }, 800)
          }else{
            this.$message.error(res.err_msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 注册
    doRegister() {
      console.log(this.register);
      userRegister(this.register)
        .then(res => {
          console.log(res);
          if (res.status == "succeed") {
            this.$message.success("register success");
          }else{
            this.$message.error(res.err_msg)
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang='stylus' scoped>
.container
  padding-top 100px
  .login-card
    width 500px
    margin 0 auto
    padding 10px
    border 1px solid #52b4f2
    border-radius 5px
    .login-tabs
      display flex
      text-align center
      .login-tabs-item
        flex-grow 1
        font-size 20px
        height 35px
        line-height 35px
        cursor pointer
      .active
        color #52b4f2
        border-bottom 1px solid #52b4f2
    .login-content
      .login-content-item
        display flex
        margin-top 10px
        align-items center
        height 40px
        span 
          flex-basis 80px
        input[type=text] 
          flex-grow 1
          height 100%
          border-color #52b4f2
          padding-left 10px
        input[type=password] 
          flex-grow 1
          height 100%
          border-color #52b4f2
          padding-left 10px
    .login-submit
      width 100px
      height 30px
      margin 30px auto
      line-height 30px
      color white
      border-radius 15px
      border 1px solid #52b4f2
      text-align center
      background-color #52b4f2

</style>