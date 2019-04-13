<template>
    <div>
      <img src="../assets/card_bg.png" class="background">
      <div class="jump2body">病历模型</div>
      <div class="showname" @click="show_dialog = true">{{name}}&nbsp;></div>
      <img :src=icon_src class="icon">

      <ul class="container">
        <div v-if="name == '超级医疗欢迎您'" class="card">
          <p class="remind">点击右下角创建病历~</p>
        </div>
        <li v-for="(items,index) in showData" v-show="items.name == name" :key="index" @click="showDetails(index)" class="card">
          <p class="time">时间：{{items.clinic_time}}</p>
          <div class="line_top"></div>
          <p class="suit">主要症状：{{items.main_suit}}</p>
          <div class="line_mid"></div>
          <p class="cure">诊断意见：{{items.cure}}</p>
          <div class="line_bom"></div>
          <p class="share" @click.stop="share(index)">分享到广场：{{items.share}}&nbsp;></p>
        </li>
      </ul>

      <img src="../assets/refresh.png" class="refresh" @click="getinfo">
      <img src="../assets/add.png" class="add" @click.stop="add_dialog = true">

      <div class="dialog" v-show="show_dialog" @click="show_dialog = false">
        <ul class="dialog_container">
          <li class="dialog_item" v-for="(items,index) in namelist" :key="index" @click.stop="choose(index)">
            {{items.name}}
          </li>
        </ul>
      </div>

      <div class="dialog" v-show="add_dialog" @click="add_dialog = false">
        <div class="add_card" @click.stop>
          <div class="upload" @click="upload">
            <img src="../assets/camera.png" class="camera">
            <p class="camera_text">上传病历图片</p>
          </div>
          <div class="fill" @click="fill">
            <img src="../assets/font.png" class="font">
            <p class="font_text">手动填写病历</p>
          </div>
          <img src="../assets/cancel.png" class="cancel" @click="add_dialog = false">
        </div>
      </div>

      <div class="black"></div>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'

    export default {
        name: "card",
      data(){
            return{
              icon_src:'../../static/icon0.png',
              show_dialog:false,
              add_dialog:false,
              name:'超级医疗欢迎您',
              namelist:[],
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

        this.$axios({
          method:'post',
          url: 'http://localhost:3000/namelist',
          data:{
            user:this.$store.state.loginState
          }
        }).then(res => {
          console.log(res)
          if(res.data != ''){
            this.namelist = res.data
          }
        }).catch(err => {
          console.log(err)
        })
      },

      methods:{


        // 未完成功能
        upload(){
          console.log('上传图片')
          this.add_dialog = false
        },
        fill(){
          console.log('手动录入')
          this.add_dialog = false
        },
        showDetails(e){
          console.log(e)
        },

        choose(e){
          this.name = this.namelist[e]
          this.icon_src = '../../static/icon'+e+'.png'
          this.show_dialog = false
        },

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
          })
        },

        share(e){
          // console.log(e)
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
  .time::after,.suit::after,.cure::after,.share::after{
    content:"";
    width:0.15rem;
    height:0.15rem;
    border-radius: 100%;
    position:absolute;
    top:9px;
    left:-0.35rem;
    background:rgb(216, 216, 216);
  }

  .line_top{
    height: 0.35rem;
    width: 0;
    color: #333333;
    border: 1px solid rgb(216, 216, 216);
    position: absolute;
    left: 0.5rem;
    top: 0.9rem;
  }

  .line_mid{
    height: 0.35rem;
    width: 0;
    color: #333333;
    border: 1px solid rgb(216, 216, 216);
    position: absolute;
    left: 0.5rem;
    top: 1.6rem;
  }

  .line_bom{
    height: 0.35rem;
    width: 0;
    color: #333333;
    border: 1px solid rgb(216, 216, 216);
    position: absolute;
    left: 0.5rem;
    top: 2.3rem;
  }

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
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 0.5rem;
  }

  .suit{
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 1.2rem;
  }

  .cure{
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 1.9rem;
  }

  .share{
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 2.6rem;
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

  .dialog{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
    background-color: rgba(0,0,0,0.3);
  }
  .dialog_container{
    border-radius: 0.2rem 0.2rem 0 0;
    width: 100%;
    height: 5rem;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 300;
    overflow: scroll;
  }
  .dialog_item{
    margin: 0 auto;
    list-style: none;
    height: 1rem;
    width: 80%;
    line-height: 1rem;
    border-bottom:gainsboro 1px solid;
    font-size: 16px;
    color: darkgrey;
    text-align: center;
  }

  .add_card{
    width: 100%;
    height: 6.5rem;
    border-radius: 0.2rem 0.2rem 0 0;
    background-color: rgb(246, 246, 246);
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .upload{
    width: 2.9rem;
    height: 2.3rem;
    position: absolute;
    top: 1rem;
    left: 0.85rem;
    text-align: center;
  }
  .camera{
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0.7rem;
    top: 0.4rem;
  }
  .camera_text{
    font-size: 14px;
    margin-top: 2rem;
  }

  .fill{
    width: 2.9rem;
    height: 2.3rem;
    position: absolute;
    top: 1rem;
    right: 0.85rem;
    text-align: center;
  }
  .font{
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0.7rem;
    top: 0.4rem;
  }
  .font_text{
    font-size: 14px;
    margin-top: 2rem;
  }

  .cancel{
    width: 1.1rem;
    height: 1.1rem;
    position: absolute;
    left: 3.2rem;
    bottom: 1rem;
  }

  .remind{
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

</style>
