<template>
    <div>
      <img src="../assets/card_bg.png" class="background">
      <div class="jump2body">病历模型</div>
      <div class="showname">{{name}}&nbsp;></div>
      <img src="../../static/icon2.png" class="icon">

      <ul class="container">
        <li v-for="(items,index) in showData" v-show="items.name == name" :key="index" @click="showDetails(index)" class="card">
          <p class="time">·&nbsp;时间：{{items.clinic_time}}</p>
          <p class="suit">·&nbsp;主要症状：{{items.main_suit}}</p>
          <p class="cure">·&nbsp;诊断意见：{{items.cure}}</p>
          <p class="share" @click.stop="share(index)">·&nbsp;分享到广场：{{items.share}}&nbsp;></p>
        </li>
      </ul>

      <img src="../assets/refresh.png" class="refresh" @click="getinfo">
      <img src="../assets/add.png" class="add">

      <div class="black"></div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'

    export default {
        name: "card",
      data(){
            return{
              name:'王医生',
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
          url: 'http://localhost:3000/getinfo',
          data:{
            user:this.$store.state.loginState
          }
        }).then(res => {
          console.log(res)
          this.showData = res.data
          this.name = res.data[0].name
        }).catch(err => {
          console.log(err)
        })
      },

      methods:{
        getinfo(){
          this.$axios({
            method:'post',
            url: 'http://localhost:3000/getinfo',
            data:{
              user:this.$store.state.loginState
            }
          }).then(res => {
            console.log(res)
            Toast({
              message:'刷新数据成功',
              duration:1000
            })
            this.showData = res.data
            this.name = res.data[0].name
          }).catch(err => {
            console.log(err)
            Toast({
              message:'网络异常',
              duration:1000
            })
          })
        },

        share(e){
          console.log(e)
          this.$axios({
            method:'post',
            url:'http://localhost:3000/share',
            data:{
              id:this.showData[e].id,
              status:this.showData[e].share
            }
          }).then(res => {
            if(res.data == 'success'){
              this.getinfo()
            }else{
              Toast({
                message:'操作失败，稍后再试',
                duration:1000
              })
            }
          }).catch(err => {
            Toast({
              message:'Network error',
              duration:1000
            })
          })
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

  .jump2body{
    position: absolute;
    top: 0.8rem;
    right: 0.4rem;
    height: 0.7rem;
    width: 1.4rem;
    border-radius: 0.7rem;
    background-color: rgba(255,255,255,0.3);
    font-size: 14px;
    color: white;
    line-height: 0.7rem;
    text-align: center;
    z-index: 3;
  }

  .showname{
    position: absolute;
    top: 2rem;
    left: 1.8rem;
    font-size: 30px;
    color: white;
  }

  .icon{
    position: absolute;
    top: 2rem;
    left: 0.4rem;
    width: 1rem;
    height: 1rem;
  }

  .container{
    margin-top: 3.5rem;
  }
  
  .card{
    background-color: #fff;
    width: 7.5rem;
    height: 3.5rem;
    position: relative;
    border-radius: 0.3rem;
    margin-bottom: 0.2rem;
  }
  
  .time{
    font-size: 18px;
    color: rgb(102, 102, 102);
    position: absolute;
    left: 0.4rem;
    top: 0.5rem;
  }

  .suit{
    font-size: 18px;
    color: rgb(102, 102, 102);
    position: absolute;
    left: 0.4rem;
    top: 1rem;
  }

  .cure{
    font-size: 18px;
    color: rgb(102, 102, 102);
    position: absolute;
    left: 0.4rem;
    top: 1.5rem;
  }

  .share{
    font-size: 18px;
    color: rgb(102, 102, 102);
    position: absolute;
    left: 0.4rem;
    top: 2rem;
  }

  .refresh{
    position: absolute;
    z-index: 100;
    right: 0.5rem;
    bottom: 3.1rem;
    width: 1rem;
    height: 1rem;
  }

  .add{
    position: absolute;
    z-index: 100;
    right: 0.5rem;
    bottom: 1.7rem;
    width: 1rem;
    height: 1rem;
  }
  
  .black{
    height: 1rem;
  }
</style>
