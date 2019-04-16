<template>
  <div>
    <img class="background" src="../assets/card_bg.png">
    <div class="back" @click="back">返回</div>
    <div class="showname">{{this.$store.state.patientName}}</div>
    <img :src="'../../static/icon'+this.$store.state.user_icon+'.png'" class="icon">

    <div class="container">
      <img src="../../static/body_border.png" class="body_pic">
      <img :src="'../../static/head'+head+'.png'" class="body_pic">
      <img :src="'../../static/arm'+arm+'.png'" class="body_pic">
      <img :src="'../../static/body'+body+'.png'" class="body_pic">
      <img :src="'../../static/leg'+leg+'.png'" class="body_pic">

      <div class="content">
        <br>
        <p class="head">头部：{{head}}次</p>
        <br>
        <p class="arm">上肢：{{arm}}次</p>
        <br>
        <p class="body">躯干：{{body}}次</p>
        <br>
        <p class="leg">下肢：{{leg}}次</p>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mybody",
    data() {
      return {
        mydata: {},
        body: 0,
        head: 0,
        arm: 0,
        leg: 0
      }
    },

    mounted() {
      this.prepare()
    },

    methods: {
      prepare() {
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/getsuit',
          data: {
            user: this.$store.state.loginState,
            name: this.$store.state.patientName
          }
        }).then(res => {
          this.mydata = res.data
          this.mydata.forEach((item) => {
            console.log(item.diagnose)
            if (item.diagnose.includes('头') || item.diagnose.includes('精神') || item.diagnose.includes('脑')) {
              this.head++
            } else if (item.diagnose.includes('手') || item.diagnose.includes('胳膊')) {
              this.arm++
            } else if (item.diagnose.includes('腿') || item.diagnose.includes('脚')) {
              this.leg++
            } else {
              this.body++
            }
          })

          console.log(this.head, this.arm, this.leg, this.body)
          // console.log(this.mydata)
        }).catch(err => {
          console.log(err)
        })
      },

      back() {
        this.$router.push('/guide')
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
    position: absolute;
    top: 0.8rem;
    right: 0.4rem;
    height: 0.7rem;
    width: 1.4rem;
    border-radius: 0.7rem;
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 14px;
    color: white;
    line-height: 0.7rem;
    text-align: center;
    z-index: 3;
  }

  .showname {
    position: absolute;
    top: 2rem;
    left: 1.8rem;
    font-size: 30px;
    color: white;
  }

  .icon {
    position: absolute;
    top: 2rem;
    left: 0.4rem;
    width: 1rem;
    height: 1rem;
  }

  .container {
    width: 100%;
    height: 10.4rem;
    background-color: #fff;
    position: absolute;
    top: 3.5rem;
    left: 0;
    border-radius: 0.2rem;
  }

  .body_pic {
    width: 4rem;
    position: absolute;
    left: 0.4rem;
    top: 0.4rem;
  }

  .body, .head, .arm, .leg {
    font-size: 16px;
  }

  .content {
    position: absolute;
    top: 1rem;
    right: 0.8rem;
    width: 2rem;
    text-align: center;
    border-radius: 0.2rem;
    box-shadow: 0 0 0.1rem 0.1rem rgba(179, 179, 179, 0.13);
  }
</style>
