<!--病历内容详情页，展示详细数据-->
<!--按钮跳转功能->返回列表目录、修改存储内容-->

<template>
  <div>
    <img src="../assets/card_bg.png" class="background">

    <img src="../assets/back.png" class="back" @click="back">

    <div class="more" @click="show_more = true">更多</div>

    <div class="dialog_more" @click="show_more = false" v-if="show_more">
      <ul class="container">
        <li class="item" @click="modify">修改</li>
        <li class="item" @click="deleteCard">删除</li>
      </ul>
    </div>

    <div class="details">
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
        <span class="item_title">出生年月</span>{{showData.birth}}
      </div>
      <div class="items">
        <span class="item_title">民族</span>{{showData.nation}}
      </div>
      <div class="items">
        <span class="item_title">婚姻状况</span>{{showData.marry}}
      </div>
      <div class="items">
        <span class="item_title">职业</span>{{showData.job}}
      </div>
      <div class="items">
        <span class="item_title">工作单位</span>{{showData.work_unit}}
      </div>
      <div class="items">
        <span class="item_title">住址</span>{{showData.address}}
      </div>
      <div class="items">
        <span class="item_title">药物过敏史</span>{{showData.allergy_history}}
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
        <span class="item_title">现病史</span>{{showData.present_illness}}
      </div>
      <div class="items">
        <span class="item_title">既往史</span>{{showData.history_illness}}
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
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name:'detail',
    data(){
      return{
        show_more:false,
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
          doctor:'',
          share:''
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
        console.log(res)
        this.showData=res.data[this.$store.state.detailIndex]
        console.log(this.showData)
      }).catch(err => {
        console.log(err)
      })
    },

    methods:{
      back(){
        this.$router.push('/guide/card')
      },

      modify(){
        this.$router.push('/modify')
      },

      deleteCard(){
        // console.log('delete')
        this.$axios({
          method: 'post',
          url:'http://localhost:3000/delete',
          data:{
            id:this.showData.id
          }
        }).then(res => {
          console.log(res)
          if(res.data == 'delete success'){
            Toast({
              message:'删除成功',
              duration:1000
            })
            this.$router.push('/guide')
          }
        }).catch(err => {
          console.log(err)
        })
      },

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
    height: 0.7rem;
    border-top: solid 0.2rem #f5f5f5;
    padding-top: 0.2rem;
    padding-left: 0.8rem;
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

  .dialog_more{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
    z-index: 10;
  }
  .container{
    position: absolute;
    bottom: 0;
    left: 0;
    border-radius: 0.2rem 0.2rem 0 0;
    width: 100%;
    height: 3rem;
    z-index: 20;
    background-color: #fff;
  }
  .item{
    list-style: none;
    font-size: 16px;
    color: rgb(105, 105, 105);
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    z-index: 30;
  }

</style>
