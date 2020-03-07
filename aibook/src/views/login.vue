<template>
  <div>
    <button @click="doLogin">登录</button>
    <button @click="doRegister">注册</button>
  </div>
</template>

<script>
import { userRegister, userLogin } from "@/api/user";

export default {
  name: "login",
  data: () => ({
    postdata: {
      user_name: "w_haiyu",
      password: "admin"
      //   email: 'w_haiyu@foxmail.com',
      //   phone: '18730327706'
    }
  }),
  created(){
      console.log(this.$getToken())
  },
  methods: {
    doLogin() {
      console.log(this.postdata);
      userLogin(this.postdata)
        .then(res => {
          console.log(res);
          if (res.status == "succeed") {
            console.log("login success");
            this.$setToken(res.token)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    doRegister() {
      console.log(this.postdata);
      userRegister(this.postdata)
        .then(res => {
          console.log(res);
          if (res.status == "succeed") {
            console.log("register success");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>