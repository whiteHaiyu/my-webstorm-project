<template>
  <div>
    <img class="background" src="../assets/card_bg.png">
    <div class="back" @click="back">返回</div>
    <div class="showname">{{this.$store.state.patientName}}</div>
    <img :src="'../../static/icon'+this.$store.state.user_icon+'.png'" class="icon">

    <div class="container">
      <img src="../../static/body.png" class="body_pic">
      <img :src="'../../static/arm'+arm_f+'.png'" class="body_pic">
      <img :src="'../../static/blood'+blood_f+'.png'" class="body_pic">
      <img :src="'../../static/brain'+brain_f+'.png'" class="body_pic">
      <img :src="'../../static/breathe'+breathe_f+'.png'" class="body_pic">
      <img :src="'../../static/digestion'+digestion_f+'.png'" class="body_pic">
      <img :src="'../../static/heart'+heart_f+'.png'" class="body_pic">
      <img :src="'../../static/leg'+leg_f+'.png'" class="body_pic">
      <img :src="'../../static/nerve'+nerve_f+'.png'" class="body_pic">
      <img :src="'../../static/urinary'+urinary_f+'.png'" class="body_pic">

      <div class="content">
        <p class="body_tip">脑部：{{brain}}次</p>
        <p class="body_tip">心脏：{{heart}}次</p>
        <p class="body_tip">呼吸系统：{{breathe}}次</p>
        <p class="body_tip">消化系统：{{digestion}}次</p>
        <p class="body_tip">神经系统：{{nerve}}次</p>
        <p class="body_tip">血液系统：{{blood}}次</p>
        <p class="body_tip">泌尿系统：{{urinary}}次</p>
        <p class="body_tip">上肢骨骼：{{arm}}次</p>
        <p class="body_tip">下肢骨骼：{{leg}}次</p>
        <p class="body_tip">其他：{{others}}次</p>
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
        arm: 0,
        arm_f: 0,
        blood: 0,
        blood_f: 0,
        brain: 0,
        brain_f: 0,
        breathe: 0,
        breathe_f: 0,
        digestion: 0,
        digestion_f: 0,
        heart: 0,
        heart_f: 0,
        leg: 0,
        leg_f: 0,
        nerve: 0,
        nerve_f: 0,
        urinary: 0,
        urinary_f: 0,
        others: 0,
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

            if (item.diagnose.includes('心')) {
              this.heart++
              if (this.heart_f < 2) {
                this.heart_f++
              }
            } else if (item.diagnose.includes('胳膊') && item.diagnose.includes('骨')) {
              this.arm++
              if (this.arm_f < 2) {
                this.arm_f++
              }
            } else if (item.diagnose.includes('血液')) {
              this.blood++
              if (this.blood_f < 2) {
                this.blood_f++
              }
            } else if (item.diagnose.includes('脑')) {
              this.brain++
              if (this.brain_f < 2) {
                this.brain_f++
              }
            } else if (item.diagnose.includes('肺') || item.diagnose.includes('气管')) {
              this.breathe++
              if (this.breathe_f < 2) {
                this.breathe_f++
              }
            } else if (item.diagnose.includes('消化') || item.diagnose.includes('胃') || item.diagnose.includes('肝')) {
              this.digestion++
              if (this.digestion_f < 2) {
                this.digestion_f++
              }
            } else if (item.diagnose.includes('腿')) {
              this.leg++
              if (this.leg_f < 2) {
                this.leg_f++
              }
            } else if (item.diagnose.includes('神经')) {
              this.nerve++
              if (this.nerve_f < 2) {
                this.nerve_f++
              }
            } else if (item.diagnose.includes('肾') || item.diagnose.includes('生殖')) {
              this.urinary++
              if (this.urinary_f < 2) {
                this.urinary_f++
              }
            }else {
              this.others++
            }
          })
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
    height: 9rem;
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

  .body_tip {
    font-size: 16px;
  }

  .content {
    position: absolute;
    top: 0.75rem;
    right: 0.5rem;
    width: 2.5rem;
    line-height: 0.75rem;
    text-align: center;
    border-radius: 0.2rem;
    box-shadow: 0 0 0.1rem 0.1rem rgba(179, 179, 179, 0.13);
  }
</style>
