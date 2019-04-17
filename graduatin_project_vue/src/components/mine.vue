<template>
  <div class="container">
    <img src="../assets/mine_bg.png" class="background">

    <img :src="'../../static/icon'+this.$store.state.user_icon+'.png'" class="icon">
    <p class="title">{{this.$store.state.loginState}}</p>
    <p class="welcome">超级医疗分享系统欢迎您！</p>

    <div class="content">
      <div class="board" @click="jump2mymsg">
        留言板
        <div class="board_msg"> ></div>
      </div>
      <div class="board">
        收到的赞
        <div class="board_msg"> ></div>
      </div>
      <div class="board">
        收到的新关注
        <div class="board_msg"> ></div>
      </div>

      <div class="signout" @click="back">
        注销账号
        <div class="board_msg"> ></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: "mine",
    data() {
      return {}
    },
    methods: {

      back() {
        this.$router.push('/')
        Toast({
          message: '账号注销成功',
          duration: 1000
        })
      },

      jump2mymsg() {
        this.$router.push('/mymsg')
      }
    }
  }
</script>

<style scoped>

  .background {
    width: 7.5rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  .icon {
    position: absolute;
    top: 2rem;
    left: 0.4rem;
    z-index: 2;
    width: 1.1rem;
    height: 1.1rem;
  }

  .title {
    color: white;
    font-size: 32px;
    z-index: 3;
    position: absolute;
    top: 1.8rem;
    left: 1.8rem;
  }

  .welcome {
    color: white;
    z-index: 3;
    font-size: 16px;
    position: absolute;
    left: 1.8rem;
    top: 2.6rem;
  }

  .content {
    position: absolute;
    top: 3.5rem;
    left: 0;
    z-index: 5;
    width: 100%;
    box-sizing: border-box;
  }

  .board, .signout {
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    font-size: 18px;
    box-sizing: border-box;
    padding-left: 0.4rem;
    background-color: #fff;
    position: relative;
    border-bottom: solid 1px rgb(245, 245, 245);
  }

  .board_msg {
    height: 1rem;
    width: 3rem;
    position: absolute;
    top: 0;
    right: 0.4rem;
    text-align: right;
    color: rgb(133, 133, 133);
  }

  .signout {
    margin-top: 0.4rem;
  }
</style>
