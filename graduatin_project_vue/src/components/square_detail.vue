<!--病历内容详情页，展示详细数据-->
<!--按钮跳转功能->返回列表目录、修改存储内容-->

<template>
  <div>
    <img src="../assets/square_bg.png" class="background">

    <img src="../assets/back.png" class="back" @click="back">

    <p class="title">留言</p>
    <p class="detail">与大家讨论治疗过程中的艰辛</p>

    <div class="details">
      <div class="header">
        <img :src="'../../static/icon'+showData.user_icon+'.png'" class="user_icon">
        <p class="user_name">{{showData.user}}</p>
        <p class="release">创建于{{showData.release_time}}</p>
      </div>
      <div class="items">
        <span class="item_title">就诊时间</span>{{showData.clinic_time}}
      </div>
      <div class="items">
        <span class="item_title">就诊地点</span>{{showData.clinic_place}}
      </div>

      <div class="basic_info">
        <p class="info_title">基本信息</p>
      </div>

      <div class="items">
        <span class="item_title">姓名</span>{{showData.name}}
      </div>
      <div class="items">
        <span class="item_title">性别</span>{{showData.sex}}
      </div>
      <div class="items">
        <span class="item_title">职业</span>{{showData.job}}
      </div>

      <div class="basic_info">
        <p class="info_title">主诉信息</p>
      </div>

      <div class="items">
        <span class="item_title">科别</span>{{showData.division}}
      </div>
      <div class="items">
        <span class="item_title">主诉</span>{{showData.main_suit}}
      </div>
      <div class="items">
        <span class="item_title">辅助检查结果</span>{{showData.examine}}
      </div>

      <div class="basic_info">
        <p class="info_title">医师诊断</p>
      </div>

      <div class="items">
        <span class="item_title">诊断意见</span>{{showData.diagnose}}
      </div>
      <div class="items">
        <span class="item_title">治疗意见</span>{{showData.cure}}
      </div>
      <div class="items">
        <span class="item_title">医嘱</span>{{showData.advice}}
      </div>
      <div class="items">
        <span class="item_title">医师</span>{{showData.doctor}}
      </div>
      <div class="blank"></div>
    </div>

    <div class="tab">
      <input type="text" class="message" placeholder="给广场主的留言" v-model="message">
      <div class="submit" @click="postmessage">留言</div>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: 'detail',
    data() {
      return {
        current_time: '',
        message: '',
        show_more: false,
        showData: {
          user: '',
          id: '',
          clinic_time: '',
          clinic_place: '',
          name: '',
          sex: '',
          birth: '',
          nation: '',
          marry: '',
          job: '',
          work_unit: '',
          address: '',
          allergy_history: '',
          division: '',
          main_suit: '',
          present_illness: '',
          history_illness: '',
          examine: '',
          diagnose: '',
          cure: '',
          advice: '',
          doctor: '',
          share: '',
          user_icon: '0',
          release_time: ''
        },
      }
    },

    mounted() {
      this.$axios({
        method: 'post',
        url: 'http://localhost:3000/selectid',
        data: {
          id: this.$store.state.detailsId
        }
      }).then(res => {
        console.log(res)
        this.showData = res.data[0]
        console.log(this.showData)
      }).catch(err => {
        console.log(err)
      })
    },

    methods: {
      back() {
        this.$router.push('/guide/card')
      },

      postmessage() {
        let mydate = new Date()
        // console.log(mydate.toLocaleDateString())
        if (this.message != '') {
          this.$axios({
            method: 'post',
            url: 'http://localhost:3000/createmsg',
            data: {
              user_from: this.$store.state.loginState,
              user_to: this.showData.user,
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

  .back {
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 0.8rem;
    left: 0.4rem;
    z-index: 2;
  }

  .details {
    width: 100%;
    position: absolute;
    left: 0;
    top: 3.5rem;
    border-radius: 0.2rem 0.2rem 0 0;
    z-index: 2;
    background-color: #fff;
  }

  .header {
    width: 100%;
    height: 1.5rem;
    line-height: 0.7rem;
    font-size: 16px;
    box-sizing: border-box;
    position: relative;
  }

  .items {
    width: 100%;
    height: auto;
    line-height: 0.7rem;
    font-size: 16px;
    color: rgb(155, 155, 155);
    text-align: right;
    box-sizing: border-box;
    padding-left: 2rem;
    padding-right: 0.4rem;
    position: relative;
  }

  .item_title {
    width: 2.1rem;
    height: 0.7rem;
    font-size: 16px;
    color: rgb(53, 53, 53);
    position: absolute;
    left: 0.4rem;
    top: 0;
    text-align: left;
  }

  .basic_info {
    width: 100%;
    height: 1rem;
    border-top: solid 0.2rem #f5f5f5;
    padding-top: 0.2rem;
    padding-left: 0.8rem;
    box-sizing: border-box;
  }

  .info_title {
    font-size: 20px;
    font-weight: bold;
  }

  .info_title::after {
    content: '';
    width: 0;
    font-size: 10px;
    border: 3px solid rgb(46, 112, 247);
    position: relative;
    left: -1.8rem;
    top: -0.01rem;
    border-radius: 3px;
  }

  .user_icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 0.4rem;
    top: 0.2rem;
    border-radius: 50%;
  }

  .user_name {
    position: absolute;
    left: 1.7rem;
    top: 0.1rem;
    color: black;
    font-weight: bold;
  }

  .release {
    position: absolute;
    left: 1.7rem;
    top: 0.5rem;
    color: rgb(155, 155, 155);
  }

  .blank {
    position: relative;
    width: 100%;
    height: 1rem;
  }

  .tab {
    width: 100%;
    height: 1rem;
    position: fixed;
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
</style>
