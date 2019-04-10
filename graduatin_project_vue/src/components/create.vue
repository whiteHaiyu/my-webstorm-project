<!--当前页面用于创建新的用户病历记录-->

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
    <p>主诉：<input type="text" v-model="addData.main_suit"></p>
    <p>现病史：<input type="text" v-model="addData.present_illness"></p>
    <p>既往史：<input type="text" v-model="addData.history_illness"></p>
    <p>辅助检查结果：<input type="text" v-model="addData.examine"></p>
    <p>医师诊断</p>
    <hr>
    <p>诊断意见：<input type="text" v-model="addData.diagnose"></p>
    <p>治疗意见：<input type="text" v-model="addData.cure"></p>
    <p>医嘱：<input type="text" v-model="addData.advice"></p>
    <p>医师：<input type="text" v-model="addData.doctor"></p>

    <input type="button" value="submit" @click="createRecord">
  </div>
</template>

<script>
  export default {
    name: "create",
    data() {
      return {
        addData: {
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
          doctor: ''
        },
      }
    },

    mounted() {
      this.addData.user = this.$store.state.loginState
      this.addData.id = this.randomString()
    },

    methods: {
      // 随机产生一个32位id，用于标识当前记录
      randomString() {
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        let id = '';
        for (let i = 0; i < 32; i++) {
          id += chars.charAt(Math.floor(Math.random() * 32));
        }
        console.log(id)
        return id;
      },

      // 创建病历记录，使用ajax将数据发送到后端记录
      createRecord() {
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/create',
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
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>

<style scoped>

</style>
