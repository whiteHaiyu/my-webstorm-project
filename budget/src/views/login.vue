<template>
  <div class="container">
      <!-- 顶部背景图 -->
      <img src="../assets/login/background.png" class="background"/>
      <div class="login_sign">
          <!-- 登录/注册切换 -->
          <div class="choose">
              <div class="choose_item" :class="formType == 'login'?'choose_item_active':''" @click="formType='login'">登录</div>
              <div class="choose_item" :class="formType == 'signin'?'choose_item_active':''" @click="formType='signin'">注册</div>
          </div>
          <!-- 登录信息 -->
          <div class="content_container" v-if="formType == 'login'">
              <div class="content_container_item">
                  <el-input placeholder="请输入账号" prefix-icon="el-icon-message" v-model="userLogin" clearable> </el-input>
              </div>
              <div class="content_container_item">
                  <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="userLoginPwd" clearable show-password></el-input>
              </div>
              <div class="content_container_item">
                  <el-button style="width:100%" type='primary' :disabled='loginDisabled'>登录</el-button>
              </div>
          </div>
          <!-- 注册信息 -->
          <div class="content_container" v-else>
              <div class="content_container_item">
                  <el-input placeholder="请输入邮箱" type="email" prefix-icon="el-icon-message" v-model="userSignin" clearable> </el-input>
              </div>
              <div class="content_container_item">
                  <el-input placeholder="请输入密码" type="password" prefix-icon="el-icon-lock" v-model="userSigninPwd" clearable></el-input>
              </div>
              <div class="content_container_item">
                  <el-input placeholder="请确认密码" type="password" prefix-icon="el-icon-lock" v-model="userSigninCheckPwd" clearable></el-input>
              </div>
              <div class="content_container_item">
                  <el-input style="width:48%" placeholder="验证码" type="text" prefix-icon="el-icon-tickets" v-model="code" clearable></el-input>
                  <el-button style="float:right; width:48%" type='primary' plain :disabled='isDisabled' @click="getCode">{{ buttonName }}</el-button>
              </div>
              <div class="content_container_item">
                  <el-button style="width:100%" type='primary' :disabled='signinDisabled'>注册</el-button>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"login",
    data:() => {
        return{
            // 页面显示切换
            formType:'login',

            // 用户登录信息
            userLogin:'',
            userLoginPwd:'',

            // 用户注册信息
            userSignin:'',
            userSigninPwd:'',
            userSigninCheckPwd:'',
            code:'',
            // 获取验证码设置
            buttonName:'获取验证码',
            isDisabled: false,
            // 设置按钮可再次点击时间
            time: 60,

            // 按钮点击后无法再次点击
            loginDisabled: false,
            signinDisabled: false,

        }
    },
    methods:{
        // 获取验证码按钮点击事件，设置再次点击时间
        getCode(){
            this.isDisabled = true
            let interval = setInterval(() => {
                this.buttonName = this.time-- + '秒后重新获取'
                if(this.time < 0){
                    this.buttonName = '获取验证码',
                    this.isDisabled = false,
                    this.time = 60
                    clearInterval(interval)
                }
            },1000)
        },
    }
}
</script>

<style lang="stylus" scoped>
.container
    .background
        width 100%
        height auto
    .login_sign
        width 290px
        border-radius 5px
        margin 0 auto 
        padding 0 10px 15px 10px
        border 2px solid rgb(241,241,241)
        .choose
            display flex
            justify-content center
            align-items center
            height 40px
            margin-bottom 15px
            .choose_item
                flex-grow 1
                text-align center
                font-size 18px
            .choose_item_active
                color #E58B37
        .content_container
            .content_container_item
                margin-bottom 15px
            .content_container_item:last-child
                margin-bottom 5px

</style>
