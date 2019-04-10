<!--病历内容详情页，展示详细数据-->
<!--按钮跳转功能->返回列表目录、修改存储内容-->

<template>
  <div>
    <p>就诊时间：{{showData.clinic_time}}</p>
    <p>就诊地点：{{showData.clinic_place}}</p>
    <br>
    <p>基础信息</p>
    <hr>
    <p>姓名：{{showData.name}}</p>
    <p>性别：{{showData.sex}}</p>
    <p>出生年月：{{showData.birth}}</p>
    <p>民族：{{showData.nation}}</p>
    <p>婚姻状况：{{showData.marry}}</p>
    <p>职业：{{showData.job}}</p>
    <p>工作单位：{{showData.work_unit}}</p>
    <p>住址：{{showData.address}}</p>
    <p>药物过敏史：{{showData.allergy_history}}</p>
    <br>
    <p>主诉信息</p>
    <hr>
    <p>科别：{{showData.division}}</p>
    <p>主诉：{{showData.main_suit}}</p>
    <p>现病史：{{showData.present_illness}}</p>
    <p>既往史：{{showData.history_illness}}</p>
    <p>辅助检查结果：{{showData.examine}}</p>
    <br>
    <p>医师诊断</p>
    <hr>
    <p>诊断意见：{{showData.diagnose}}</p>
    <p>治疗意见：{{showData.cure}}</p>
    <p>医嘱：{{showData.advice}}</p>
    <p>医师：{{showData.doctor}}</p>

    <input type="button" value="back" @click="back">
    <input type="button" value="modify" @click="modify">
  </div>
</template>

<script>

  export default {
    name:'detail',
    data(){
      return{
        showData:{
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
        this.showData=res.data[this.$store.state.detailIndex]
        console.log(this.showData)
      }).catch(err => {
        console.log(err)
      })
    },

    methods:{
      back(){
        this.$router.push('/home')
      },

      modify(){
        this.$router.push('/modify')
      }
    }
  }

</script>

<style scoped>

</style>
