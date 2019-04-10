<!--内容修改界面，对原有内容进行修改-->
<!--同时开放对所有内容的修改-->

<template>
  <div>
    <p>就诊时间：<input type="text" v-model="addData.clinic_time"></p>
    <p>就诊地点：<input type="text" v-model="addData.clinic_place"></p>
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
    <p>主诉信息</p>
    <hr>
    <p>科别：<input type="text" v-model="addData.division"></p>
    <p>现病史：<input type="text" v-model="addData.present_illness"></p>
    <p>既往史：<input type="text" v-model="addData.history_illness"></p>
    <p>辅助检查结果：<input type="text" v-model="addData.examine"></p>
    <p>医师诊断</p>
    <hr>
    <p>诊断意见：<input type="text" v-model="addData.diagnose"></p>
    <p>治疗意见：<input type="text" v-model="addData.cure"></p>
    <p>医嘱：<input type="text" v-model="addData.advice"></p>
    <p>医师：<input type="text" v-model="addData.doctor"></p>
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

    }
  }
</script>

<style scoped>

</style>
