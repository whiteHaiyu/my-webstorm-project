<!--当前页面用于创建新的用户病历记录-->

<template>
  <div>
    <img src="../assets/card_bg.png" class="background">

    <img src="../assets/back.png" class="back" @click="back">

    <div class="more" @click="createRecord">确定</div>


    <div class="details">
      <div class="items">
        <span class="item_title">就诊时间</span><input type="textarea" v-model="addData.clinic_time" class="item_input"
                                                   placeholder="请输入就诊时间">
      </div>
      <div class="items">
        <span class="item_title">就诊地点</span><input type="textarea" v-model="addData.clinic_place" class="item_input"
                                                   placeholder="请输入就诊地点">
      </div>

      <div class="basic_info">
        <p class="info_title">基本信息</p>
      </div>

      <div class="items">
        <span class="item_title">姓名</span><input type="textarea" v-model="addData.name" class="item_input"
                                                 placeholder="请输入姓名">
      </div>
      <div class="items">
        <span class="item_title">性别</span><input type="textarea" v-model="addData.sex" class="item_input"
                                                 placeholder="请输入性别">
      </div>
      <div class="items">
        <span class="item_title">出生年月</span><input type="textarea" v-model="addData.birth" class="item_input"
                                                   placeholder="请输入出生年月">
      </div>
      <div class="items">
        <span class="item_title">民族</span><input type="textarea" v-model="addData.nation" class="item_input"
                                                 placeholder="请输入民族">
      </div>
      <div class="items">
        <span class="item_title">婚姻状况</span><input type="textarea" v-model="addData.marry" class="item_input"
                                                   placeholder="请输入婚姻状况">
      </div>
      <div class="items">
        <span class="item_title">职业</span><input type="textarea" v-model="addData.job" class="item_input"
                                                 placeholder="请输入职业">
      </div>
      <div class="items">
        <span class="item_title">工作单位</span><input type="textarea" v-model="addData.work_unit" class="item_input"
                                                   placeholder="请输入工作单位">
      </div>
      <div class="items">
        <span class="item_title">住址</span><input type="textarea" v-model="addData.address" class="item_input"
                                                 placeholder="请输入住址">
      </div>
      <div class="items">
        <span class="item_title">药物过敏史</span><input type="textarea" v-model="addData.allergy_history" class="item_input"
                                                    placeholder="请输入药物过敏史">
      </div>

      <div class="basic_info">
        <p class="info_title">主诉信息</p>
      </div>

      <div class="items">
        <span class="item_title">科别</span><input type="textarea" v-model="addData.division" class="item_input"
                                                 placeholder="请输入科别">
      </div>
      <div class="items">
        <span class="item_title">主诉</span><input type="textarea" v-model="addData.main_suit" class="item_input"
                                                 placeholder="请输入主诉">
      </div>
      <div class="items">
        <span class="item_title">现病史</span><input type="textarea" v-model="addData.present_illness" class="item_input"
                                                  placeholder="请输入现病史">
      </div>
      <div class="items">
        <span class="item_title">既往史</span><input type="textarea" v-model="addData.history_illness" class="item_input"
                                                  placeholder="请输入既往史">
      </div>
      <div class="items">
        <span class="item_title">辅助检查结果</span><input type="textarea" v-model="addData.examine" class="item_input"
                                                     placeholder="请输入辅助检查结果">
      </div>
      <div class="items">
        <span class="item_title">其他</span><input type="textarea" v-model="addData.others" class="item_input"
                                                     placeholder="其他结果">
      </div>

      <div class="basic_info">
        <p class="info_title">医师诊断</p>
      </div>

      <div class="items">
        <span class="item_title">诊断意见</span><input type="textarea" v-model="addData.diagnose" class="item_input"
                                                   placeholder="请输入诊断意见">
      </div>
      <div class="items">
        <span class="item_title">治疗意见</span><input type="textarea" v-model="addData.cure" class="item_input"
                                                   placeholder="请输入治疗意见">
      </div>
      <div class="items">
        <span class="item_title">医嘱</span><input type="textarea" v-model="addData.advice" class="item_input"
                                                 placeholder="请输入医嘱">
      </div>
      <div class="items">
        <span class="item_title">医师</span><input type="textarea" v-model="addData.doctor" class="item_input"
                                                 placeholder="请输入医师">
      </div>
      <div class="blank"></div>
    </div>
  </div>

</template>

<script>
  import {Toast} from 'mint-ui'
  import {Indicator} from 'mint-ui'

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
          doctor: '',
          others:''
        },
        getResponse:[]
      }
    },

    mounted() {

      Indicator.open({
        text: 'Loading...',
        spinnerType: 'fading-circle'
      })

      this.addData.user = this.$store.state.loginState
      this.addData.id = this.randomString()

      console.log('postdata：'+ sessionStorage.getItem('img_base64'))

      this.$axios({
        method: 'post',
        url: 'http://localhost:3000/img',
        data: sessionStorage.getItem('img_base64')
      }).then(res => {
        console.log(res)
        this.getResponse = res.data.words_result
        console.log(this.getResponse)
        Indicator.close()
        if(res.data.words_result != ''){
          this.fillBlanks(res.data.words_result)
          Toast({
            message: '图片识别成功',
            duration: 1000
          })
        }
      }).catch(err => {
        console.log(err)
        Indicator.close()
        Toast({
          message: '图片识别失败，请手动录入信息',
          duration: 1000
        })
      })

    },

    methods: {
      // 随机产生一个32位id，用于标识当前记录
      randomString() {
        let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz1234567890';
        /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        let id = '';
        for (let i = 0; i < 32; i++) {
          id += chars.charAt(Math.floor(Math.random() * 50));
        }
        console.log(id)
        return id;
      },

      back() {
        this.$router.push('/guide')
      },

      // 创建病历记录，使用ajax将数据发送到后端记录
      createRecord() {
        let mydate = new Date()
        if (this.addData.clinic_place != '' && this.addData.clinic_time != '' && this.addData.name != '') {
          for(let i in this.addData){
            if(this.addData[i] == ''){
              this.addData[i] = '未知'
            }
          }
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
              doctor: this.addData.doctor,
              share: '未分享到广场',
              release_time: mydate.toLocaleDateString(),
              user_icon: this.$store.state.user_icon,
              others:this.addData.others

            }
          }).then(res => {
            console.log(res)
            if (res.data = 'create success') {
              this.$router.push('/guide')
              Toast({
                message: '创建病历成功',
                duration: 1000
              })
            }
          }).catch(err => {
            console.log(err)
          })
        } else {
          Toast({
            message: '就诊时间地点与患者姓名不能为空',
            duration: 1000
          })
        }
      },

      fillBlanks(mystring){
        for(let i in mystring){
          // if(JSON.stringify(mystring[i]).indexOf('姓名') != -1){
          //   this.addData.name = mystring[i+1].words
          // }
          console.log(mystring[i])
          let str = ''
          let index = Number(i)+1
          if(mystring[i] != ''){
            str = mystring[i].words
          }

          if(str.indexOf('姓名') != -1)
          {
            this.addData.name = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('性别') != -1) {
            this.addData.sex = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('生日') != -1)
          {
            this.addData.birth = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('民族') != -1)
          {
            this.addData.nation = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('婚姻') != -1)
          {
            this.addData.marry = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('工作') != -1)
          {
            this.addData.job = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('地址') != -1)
          {
            this.addData.address = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('主诉') != -1)
          {
            this.addData.main_suit = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('诊断') != -1)
          {
            this.addData.diagnose = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('医嘱') != -1)
          {
            this.addData.adivice = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('治疗') != -1)
          {
            this.addData.cure = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('医师') != -1)
          {
            this.addData.doctor = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }else if(str.indexOf('检查') != -1)
          {
            this.addData.examine = mystring[index].words
            mystring[i] = ''
            mystring[index] = ''
            console.log(index)
          }
        }

        let otherInfo = ''
        for(let j in mystring){
          if(mystring[j] != ''){
            otherInfo += mystring[j].words
          }
        }

        this.addData.others = otherInfo
        console.log(this.addData.others)
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

  .more {
    width: 1.4rem;
    height: 0.6rem;
    position: absolute;
    top: 0.8rem;
    right: 0.4rem;
    z-index: 2;
    border-radius: 0.6rem;
    font-size: 16px;
    color: white;
    background-color: rgba(255, 255, 255, 0.3);
    text-align: center;
    line-height: 0.6rem;
  }

  .details {
    width: 100%;
    position: absolute;
    top: 1.9rem;
    border-radius: 0.2rem 0.2rem 0 0;
    z-index: 2;
    background-color: #fff;
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

  .item_input {
    border: none;
    outline: 0 none;
    font-size: 16px;
    color: rgb(157, 157, 157);
    width: 4.5rem;
    height: auto;
    text-align: right;
  }

  .blank {
    width: 100%;
    height: 0.5rem;
  }

</style>
