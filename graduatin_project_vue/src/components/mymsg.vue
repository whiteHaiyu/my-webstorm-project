<template>
  <div>
    <img src="../assets/mine_bg.png" class="background">

    <div class="dialog" v-if="show_dialog">
      <div class="click" @click="show_dialog = false"></div>
      <div class="tab">
        <input type="text" class="message" placeholder="回复留言" v-model="message">
        <div class="submit" @click="postmessage">留言</div>
      </div>
    </div>

    <img src="../assets/back.png" class="return" @click="back">
    <p class="title">留言板</p>
    <p class="detail">超级医疗信息分享系统欢迎您！</p>

    <ul class="container">
      <div class="card" v-if="msgdata.length == 0">
        <p class="remind">还没有收到留言哦~</p>
      </div>
      <li v-for="(items,index) in msgdata" :key="index" class="card">

        <img :src="'../../static/icon'+items.user_icon+'.png'" class="head_icon">
        <div class="back" @click="reMsg(index)"><img src="../assets/recall.png" class="back_icon">&nbsp;&nbsp;回复</div>
        <img src="../assets/delete.png" class="delete" @click="deleteMsg(index)">
        <p class="from">{{items.user_from}}</p>
        <p class="time">留言于{{items.time}}</p>
        <p class="content">{{items.msg}}</p>

      </li>
    </ul>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: "mymsg",
    data() {
      return {
        msgdata: {},
        show_dialog: false,
        message: '',
        tmp: ''
      }
    },
    mounted() {
      this.getinfo()
    },

    methods: {
      getinfo() {
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/askmsg',
          data: {
            user: this.$store.state.loginState
          }
        }).then(res => {
          console.log(res)
          this.msgdata = res.data
        }).catch(err => {
          console.log(err)
        })
      },

      back() {
        this.$router.push('/guide')
      },

      deleteMsg(e) {
        console.log(this.msgdata[e].id)
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/deletemsg',
          data: {
            id: this.msgdata[e].id
          }
        }).then(res => {
          if (res.data == 'delete success') {
            Toast({
              message: '删除留言成功',
              duration: 1000
            })
            this.getinfo()
          }
        }).catch(err => {
          console.log(err)
        })
      },

      reMsg(e) {
        console.log('reMsg')
        this.tmp = e
        this.show_dialog = true
      },

      postmessage() {
        console.log('post')
        let mydate = new Date()
        if (this.message != '') {
          this.show_dialog = false
          this.$axios({
            method: 'post',
            url: 'http://localhost:3000/createmsg',
            data: {
              user_from: this.$store.state.loginState,
              user_to: this.msgdata[this.tmp].user_from,
              msg: this.message,
              time: mydate.toLocaleDateString(),
              user_icon: this.$store.state.user_icon
            }
          }).then(res => {
            console.log(res)
            if (res.data == 'set msg success') {
              Toast({
                message: '留言成功',
                duration: 1000
              })
              this.message = ''
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          Toast({
            message: '请输入留言内容',
            duration: 1000
          })
        }
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
    z-index: 0;
  }

  .title {
    position: absolute;
    top: 2rem;
    left: 0.4rem;
    font-size: 32px;
    color: white;
  }

  .detail {
    position: absolute;
    top: 2.8rem;
    left: 0.4rem;
    font-size: 16px;
    color: white;
  }

  .container {
    margin-top: 3.5rem;
  }

  .card {
    background-color: #fff;
    width: 7.5rem;
    height: 3rem;
    position: relative;
    border-radius: 0.3rem;
    margin-bottom: 0.2rem;
  }

  .head_icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 0.4rem;
    top: 0.2rem;
  }

  .from {
    font-size: 16px;
    position: absolute;
    top: 0.3rem;
    left: 1.6rem;
    font-weight: bold;
  }

  .time {
    font-size: 16px;
    position: absolute;
    top: 0.7rem;
    left: 1.6rem;
    color: rgb(135, 135, 135);
  }

  .content {
    font-size: 16px;
    width: 6.7rem;
    height: auto;
    max-height: 1.5rem;
    position: absolute;
    left: 0.4rem;
    top: 1.3rem;
  }

  .remind {
    color: rgb(171, 171, 171);
    font-size: 24px;
    width: 7rem;
    height: 2.5rem;
    text-align: center;
    /*border: 0.1rem dashed rgb(171, 171, 171);*/
    border-radius: 0.5rem;
    line-height: 2.3rem;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    box-sizing: border-box;
    font-weight: bolder;
  }

  .return {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 0.8rem;
    left: 0.4rem;
    z-index: 2;
  }

  .back {
    position: absolute;
    height: 0.4rem;
    bottom: 0.2rem;
    right: 0.4rem;
    font-size: 14px;
    line-height: 0.4rem;
    color: rgb(135, 135, 135);
  }

  .back img {
    position: relative;
    top: 0.05rem;
  }

  .back_icon {
    width: 0.3rem;
    height: 0.3rem;
  }

  .delete {
    position: absolute;
    top: 0.2rem;
    right: 0.4rem;
    width: 0.3rem;
    height: 0.3rem;
  }

  .tab {
    width: 100%;
    height: 1rem;
    position: absolute;
    bottom: 0;
    left: 0;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    z-index: 100;
    font-size: 16px;
  }

  .message {
    width: 4.2rem;
    height: 0.6rem;
    border: none;
    outline: 0 none;
    position: absolute;
    left: 0.4rem;
    top: 0.2rem;
    border-radius: 0.6rem;
    padding-left: 0.3rem;
    padding-right: 0.3rem;
    background-color: rgb(244, 244, 244);
  }

  .submit {
    width: 1.5rem;
    height: 0.6rem;
    position: absolute;
    right: 0.4rem;
    top: 0.2rem;
    line-height: 0.6rem;
    text-align: center;
    border-radius: 0.6rem;
    background-color: rgb(46, 112, 247);
    color: white;
  }

  .dialog {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  .click {
    height: 80%;
    width: 100%;
  }
</style>
