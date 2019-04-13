<!--内容修改界面，对原有内容进行修改-->
<!--同时开放对所有内容的修改-->

<template>
  <div>
    <input type="button" value="cancle" @click="jump">
    <p>就诊时间：<input type="text" v-model="addData.clinic_time"></p>
    <p>就诊地点：<input type="text" v-model="addData.clinic_place"></p>
    <br>
    <p>基础信息</p>
    <hr>
    <p>姓名：<input type="text" v-model="addData.name"></p>
    <p>性别：<input type="text" v-model="addData.sex"></p>
    <p>出生年月：<input type="text" v-model="addData.birth"></p>
    <p>民族：<input type="text" v-model="addData.nation"></p>
    <p>婚姻状况：<input type="text" v-model="addData.marry"></p>
    <p>职业：<input type="text" v-model="addData.job"></p>
    <p>工作单位：<input type="text" v-model="addData.work_unit"></p>
    <p>住址：<input type="text" v-model="addData.address"></p>
    <p>药物过敏史：<input type="text" v-model="addData.allergy_history"></p>
    <br>
    <p>主诉信息</p>
    <hr>
    <p>科别：<input type="text" v-model="addData.division"></p>
    <p>主诉：<input type="text" v-model="addData.main_suit"></p>
    <p>现病史：<input type="text" v-model="addData.present_illness"></p>
    <p>既往史：<input type="text" v-model="addData.history_illness"></p>
    <p>辅助检查结果：<input type="text" v-model="addData.examine"></p>
    <br>
    <p>医师诊断</p>
    <hr>
    <p>诊断意见：<input type="text" v-model="addData.diagnose"></p>
    <p>治疗意见：<input type="text" v-model="addData.cure"></p>
    <p>医嘱：<input type="text" v-model="addData.advice"></p>
    <p>医师：<input type="text" v-model="addData.doctor"></p>

    <input type="button" value="modify" @click="modify">
    <input type="button" value="cancle" @click="cancle">
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
        url:'http://localhost:3000/getinfo',
        data:{
          user:this.$store.state.loginState
        }
      }).then(res => {
        // console.log(res)
        this.addData=res.data[this.$store.state.detailIndex]
        console.log(this.addData)
      }).catch(err => {
        console.log(err)
      })
    },

    methods:{

      jump(){
        this.$router.push('/')
      },

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

      cancle(){
        this.$router.push('/detail')
      }
    }
  }
</script>

<style scoped>

</style>
