<template>
  <div>
    <img src="../assets/square_bg.png" class="background">
    <p class="title">广场</p>
    <p class="detail">与大家分享战胜病魔的经历吧</p>

    <div class="search">
      <img src="../assets/search.png" class="search_icon">
      <input type="text" v-model="searchInfo" placeholder="请输入查询内容" class="search_info">
    </div>
    <div class="search_button" @click="search">搜索</div>

    <img src="../assets/refresh.png" class="refresh" @click="refresh">

    <ul class="container">
      <div class="card" v-if="showData.length == 0">
        <p class="remind">快去分享第一份病历吧~</p>
      </div>
      <li :key="index" @click="showDetails(index)" class="card" v-for="(items,index) in showData">
        <img :src="'../../static/icon'+items.user_icon+'.png'" class="icon">
        <p class="user">{{items.name}}</p>
        <p class="release">创建于{{items.release_time}}</p>

        <p class="time">病历时间：{{items.clinic_time}}</p>
        <div class="line_top"></div>
        <p class="suit">主要症状：{{items.main_suit}}</p>
        <div class="line_mid"></div>
        <p class="cure">诊断意见：{{items.cure}}</p>
      </li>
      <div class="blank"></div>
    </ul>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: "square",
    data() {
      return {
        searchInfo:'',

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
          release_time: '',
          user_icon: '',
          others:''
        },
      }
    },

    mounted() {
      this.refresh()
    },

    methods: {
      refresh() {
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/square'
        }).then(res => {
          // console.log(res)
          this.showData = res.data
          console.log(this.showData.length)
          console.log(this.showData)
          Toast({
            message: '数据刷新成功',
            duration: 1000
          })
        }).catch(err => {
          console.log(err)
        })
      },

      search() {
        if(this.searchInfo != ''){
          this.$axios({
            method: 'post',
            url: 'http://localhost:3000/find',
            data:{
              searchInfo:'%'+this.searchInfo+'%'
            }
          }).then(res => {
            // console.log(res)
            this.showData = res.data
            console.log(this.showData.length)
            console.log(this.showData)
            Toast({
              message: '数据查询成功',
              duration: 1000
            })
          }).catch(err => {
            console.log(err)
          })
        }
      },

      showDetails(e) {
        console.log(this.showData[e].id)
        this.$store.commit('getId', this.showData[e].id)
        this.$router.push('/square_detail')
      }
    }
  }
</script>

<style scoped>

  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
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

  .container {
    margin-top: 3.5rem;
  }

  .card {
    background-color: #fff;
    width: 7.5rem;
    height: 3.5rem;
    position: relative;
    border-radius: 0.3rem;
    margin-bottom: 0.2rem;
  }

  .refresh {
    position: fixed;
    z-index: 100;
    right: 0.5rem;
    bottom: 1.7rem;
    width: 1rem;
    height: 1rem;
  }

  .remind {
    color: rgb(171, 171, 171);
    font-size: 32px;
    width: 7rem;
    height: 3rem;
    text-align: center;
    border: 0.1rem dashed rgb(171, 171, 171);
    border-radius: 0.5rem;
    line-height: 2.8rem;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    box-sizing: border-box;
    font-weight: bolder;
  }

  .line_top {
    height: 0.35rem;
    width: 0;
    color: #333333;
    border: 1px solid rgb(216, 216, 216);
    position: absolute;
    left: 0.5rem;
    top: 1.9rem;
  }

  .line_mid {
    height: 0.35rem;
    width: 0;
    color: #333333;
    border: 1px solid rgb(216, 216, 216);
    position: absolute;
    left: 0.5rem;
    top: 2.6rem;
  }

  .time {
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 1.5rem;
  }

  .suit {
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 2.2rem;
  }

  .cure {
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 2.9rem;
  }

  .time::after, .suit::after, .cure::after {
    content: "";
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 100%;
    position: absolute;
    top: 9px;
    left: -0.35rem;
    background: rgb(216, 216, 216);
  }

  .icon {
    width: 1rem;
    height: 1rem;
    position: absolute;
    left: 0.4rem;
    top: 0.2rem;
  }

  .user {
    position: absolute;
    top: 0.3rem;
    left: 1.6rem;
    font-size: 16px;
    font-weight: bold;
    color: black;
  }

  .release {
    position: absolute;
    top: 0.8rem;
    left: 1.6rem;
    font-size: 14px;
    color: rgb(135, 135, 135);
  }

  .blank {
    width: 100%;
    height: 1rem;
  }

  .search{
    width: 5.3rem;
    height: 0.5rem;
    position: absolute;
    left: 0.4rem;
    top: 0.7rem;
    background-color: #fff;
    border-radius: 0.5rem;
  }

  .search_button{
    width: 1rem;
    height: 0.55rem;
    background-color: #fff;
    font-size: 14px;
    text-align: center;
    line-height: 0.6rem;
    box-sizing: border-box;
    position: absolute;
    top: 0.7rem;
    left: 6rem;
    color: rgb(105, 152, 252);
    border: 1px solid rgb(105, 152, 252);
    border-radius: 5px;
  }

  .search_icon{
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    top: 0.1rem;
    left: 0.1rem;
  }

  .search_info{
    width: 4rem;
    height: 0.5rem;
    position: absolute;
    left: 0.5rem;
    top: 0;
    border: none;
    outline: none;
  }
</style>
