<!--内容修改界面，对原有内容进行修改-->
<!--同时开放对所有内容的修改-->

<template>
  <div>
    <img class="background" src="../assets/card_bg.png">

    <img @click="back" class="back" src="../assets/back.png">

    <div @click="modify" class="more">确定</div>

    <div class="details">
      <div class="items">
        <span class="item_title">就诊时间</span><input type="textarea" v-model="addData.clinic_time" class="item_input" placeholder="请输入就诊时间">
      </div>
      <div class="items">
        <span class="item_title">就诊地点</span><input type="textarea" v-model="addData.clinic_place" class="item_input" placeholder="请输入就诊地点">
      </div>

      <div class="basic_info">
        <p class="info_title">基本信息</p>
      </div>

      <div class="items">
        <span class="item_title">姓名</span><input class="item_input" type="textarea" v-model="addData.name">
      </div>
      <div class="items">
        <span class="item_title">性别</span><input class="item_input" type="textarea" v-model="addData.sex">
      </div>
      <div class="items">
        <span class="item_title">出生年月</span><input class="item_input" placeholder="请输入出生年月" type="textarea" v-model="addData.birth">
      </div>
      <div class="items">
        <span class="item_title">民族</span><input class="item_input" placeholder="请输入民族" type="textarea" v-model="addData.nation">
      </div>
      <div class="items">
        <span class="item_title">婚姻状况</span><input class="item_input" placeholder="请输入婚姻状况" type="textarea" v-model="addData.marry">
      </div>
      <div class="items">
        <span class="item_title">职业</span><input class="item_input" placeholder="请输入职业" type="textarea" v-model="addData.job">
      </div>
      <div class="items">
        <span class="item_title">工作单位</span><input class="item_input" placeholder="请输入工作单位" type="textarea" v-model="addData.work_unit">
      </div>
      <div class="items">
        <span class="item_title">住址</span><input class="item_input" placeholder="请输入住址" type="textarea" v-model="addData.address">
      </div>
      <div class="items">
        <span class="item_title">药物过敏史</span><input class="item_input" placeholder="请输入药物过敏史" type="textarea" v-model="addData.allergy_history">
      </div>

      <div class="basic_info">
        <p class="info_title">主诉信息</p>
      </div>

      <div class="items">
        <span class="item_title">科别</span><input class="item_input" placeholder="请输入科别" type="textarea" v-model="addData.division">
      </div>
      <div class="items">
        <span class="item_title">主诉</span><input class="item_input" placeholder="请输入主诉" type="textarea" v-model="addData.main_suit">
      </div>
      <div class="items">
        <span class="item_title">现病史</span><input class="item_input" placeholder="请输入现病史" type="textarea" v-model="addData.present_illness">
      </div>
      <div class="items">
        <span class="item_title">既往史</span><input class="item_input" placeholder="请输入既往史" type="textarea" v-model="addData.history_illness">
      </div>
      <div class="items">
        <span class="item_title">辅助检查结果</span><input class="item_input" placeholder="请输入辅助检查结果" type="textarea" v-model="addData.examine">
      </div>

      <div class="basic_info">
        <p class="info_title">医师诊断</p>
      </div>

      <div class="items">
        <span class="item_title">诊断意见</span><input class="item_input" placeholder="请输入诊断意见" type="textarea" v-model="addData.diagnose">
      </div>
      <div class="items">
        <span class="item_title">治疗意见</span><input class="item_input" placeholder="请输入治疗意见" type="textarea" v-model="addData.cure">
      </div>
      <div class="items">
        <span class="item_title">医嘱</span><input class="item_input" placeholder="请输入医嘱" type="textarea" v-model="addData.advice">
      </div>
      <div class="items">
        <span class="item_title">医师</span><input class="item_input" placeholder="请输入医师" type="textarea" v-model="addData.doctor">
      </div>
      <div class="blank"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "modify",
    data(){
      return{
        addData:{
          user:'',
          id:'',
          clinic_time:'',
          clinic_place:'',
          name:'',
          sex:'',
          birth:'',
          nation:'',
          marry:'',
          job:'',
          work_unit:'',
          address:'',
          allergy_history:'',
          division:'',
          main_suit:'',
          present_illness:'',
          history_illness:'',
          examine:'',
          diagnose:'',
          cure:'',
          advice:'',
          doctor:''
        },
      }
    },

    mounted(){
      this.$axios({
        method:'post',
        url:'http://localhost:3000/selectid',
        data:{
          id:this.$store.state.detailsId
        }
      }).then(res => {
        // console.log(res)
        this.addData=res.data[0]
        console.log(this.addData)
      }).catch(err => {
        console.log(err)
      })
    },

    methods:{

      modify(){
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/modify',
          data: {
            user: this.addData.user,
            id: this.addData.id,
            clinic_time: this.addData.clinic_time,
            clinic_place: this.addData.clinic_place,
            name: this.addData.name,
            sex: this.addData.sex,
            birth: this.addData.birth,
            nation: this.addData.nation,
            marry: this.addData.marry,
            job: this.addData.job,
            work_unit: this.addData.work_unit,
            address: this.addData.address,
            allergy_history: this.addData.allergy_history,
            division: this.addData.division,
            main_suit: this.addData.main_suit,
            present_illness: this.addData.present_illness,
            history_illness: this.addData.history_illness,
            examine: this.addData.examine,
            diagnose: this.addData.diagnose,
            cure: this.addData.cure,
            advice: this.addData.advice,
            doctor: this.addData.doctor
          }
        }).then(res => {
          console.log(res)
          this.$router.push('/detail')
        }).catch(err => {
          console.log(err)
        })
      },

      back(){
        this.$router.push('/detail')
      }
    }
  }
</script>

<style scoped>
  .background{
    width: 7.5rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .back{
    width: 0.6rem;
    height: 0.6rem;
    position: absolute;
    top: 0.8rem;
    left: 0.4rem;
    z-index: 2;
  }

  .more{
    width: 1.4rem;
    height: 0.6rem;
    position: absolute;
    top: 0.8rem;
    right: 0.4rem;
    z-index: 2;
    border-radius: 0.6rem;
    font-size: 16px;
    color: white;
    background-color: rgba(255,255,255,0.3);
    text-align: center;
    line-height: 0.6rem;
  }

  .details{
    width: 100%;
    position: absolute;
    top: 1.9rem;
    border-radius: 0.2rem 0.2rem 0 0;
    z-index: 2;
    background-color: #fff;
  }

  .items{
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
  .item_title{
    width: 2.1rem;
    height: 0.7rem;
    font-size: 16px;
    color: rgb(53, 53, 53);
    position: absolute;
    left: 0.4rem;
    top: 0;
    text-align: left;
  }

  .basic_info{
    width: 100%;
    height: 1rem;
    border-top: solid 0.2rem #f5f5f5;
    padding-top: 0.2rem;
    padding-left: 0.8rem;
    box-sizing: border-box;
  }
  .info_title{
    font-size: 20px;
    font-weight: bold;
  }
  .info_title::after{
    content: '';
    width: 0;
    font-size: 10px;
    border: 3px solid rgb(46, 112, 247);
    position: relative;
    left: -1.8rem;
    top: -0.01rem;
    border-radius: 3px;
  }

  .item_input{
    border: none;
    outline: 0 none;
    font-size: 16px;
    color: rgb(129, 163, 234);
    width: 4.5rem;
    height: auto;
    text-align: right;
  }

  .blank{
    width: 100%;
    height: 0.5rem;
  }
</style>
