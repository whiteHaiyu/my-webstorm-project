<template>
  <div>
    <img class="background" src="../assets/card_bg.png">
    <div class="jump2body" @click="jump2body">分类统计</div>
    <div @click="show_dialog = true" class="showname">{{name}}&nbsp;></div>
    <img :src="'../../static/icon'+this.$store.state.user_icon+'.png'" class="icon">

    <ul class="container">
      <div class="card" v-if="name == '超级医疗欢迎您'">
        <p class="remind">点击右下角创建病历~</p>
      </div>
      <li :key="index" @click="showDetails(index)" class="card" v-for="(items,index) in showData"
          v-show="items.name == name">
        <p class="time">时间：{{items.clinic_time}}</p>
        <div class="line_top"></div>
        <p class="suit">主要症状：{{items.main_suit}}</p>
        <div class="line_mid"></div>
        <p class="cure">诊断意见：{{items.cure}}</p>
        <div class="line_bom"></div>
        <p @click.stop="share(index)" class="share">分享到广场：{{items.share}}&nbsp;></p>
      </li>
    </ul>

    <img @click="getinfo" class="refresh" src="../assets/refresh.png">
    <img @click.stop="add_dialog = true" class="add" src="../assets/add.png">

    <div @click="show_dialog = false" class="dialog" v-show="show_dialog">
      <ul class="dialog_container">
        <li :key="index" @click.stop="choose(index)" class="dialog_item" v-for="(items,index) in namelist">
          {{items.name}}
        </li>
      </ul>
    </div>

    <div @click="add_dialog = false" class="dialog" v-show="add_dialog">
      <div @click.stop class="add_card">
        <div @click="upload" class="upload">
          <img class="camera" src="../assets/camera.png">
          <p class="camera_text">上传病历图片</p>
        </div>
        <div @click="fill" class="fill">
          <img class="font" src="../assets/font.png">
          <p class="font_text">手动填写病历</p>
        </div>
        <img @click="add_dialog = false" class="cancel" src="../assets/cancel.png">
      </div>
    </div>

    <div class="dialog" v-show="update_dialog">
      <div class="upload_dialog">
        <div class="upload_content">点击上传图片</div>
        <input type="file" accept="image/*" @change="changeImg($event)" class="upload_input">
        <p class="upload_name">{{imgName}}</p>
        <p class="upload_confirm" @click="autocreate">确定</p>
        <p class="upload_cancel" @click="update_dialog = false">取消</p>
      </div>
    </div>

    <div class="black"></div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'

  export default {
    name: "card",
    data() {
      return {
        imgName:'',
        update_dialog: false,
        show_dialog: false,
        add_dialog: false,
        name: '超级医疗欢迎您',
        namelist: [],
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
          share: ''
        },

      }
    },

    mounted() {
      this.$axios({
        method: 'post',
        url: 'http://localhost:3000/getinfo',
        data: {
          user: this.$store.state.loginState
        }
      }).then(res => {
        console.log(res)
        this.showData = res.data
        this.name = res.data[0].name
        this.$store.commit('getName', res.data[0].name)
      }).catch(err => {
        console.log(err)
      })

      this.$axios({
        method: 'post',
        url: 'http://localhost:3000/namelist',
        data: {
          user: this.$store.state.loginState
        }
      }).then(res => {
        console.log(res)
        if (res.data != '') {
          this.namelist = res.data
        }
      }).catch(err => {
        console.log(err)
      })
    },

    methods: {

      autocreate(){
        if( sessionStorage.getItem("img_base64") != ''){
          this.$router.push('/autocreate')
        }else{
          Toast({
            message:'未选择图片',
            duration:1000
          })
          this.update_dialog = false
        }
      },

      // 直接上传图片
      changeImg(event){
        this.imgName = event.target.value
        let reader = new FileReader();
        let file = event.target.files[0];
        let mydata = new Blob()
        reader.readAsDataURL(file);
        reader.onload = function(){
          // console.log(reader.result)
          mydata = reader.result
          sessionStorage.setItem('img_base64', mydata)
        }
      },
      //上传图片，canvas压缩
      // changeImg(e){
      //   console.log(e)
      //   this.imgName = e.target.value
      //   let imgLimit = 1024
      //   let files = e.target.files
      //   let image = new Image()
      //   if (files.length > 0) {
      //     let dd = 0;
      //
      //     if (files.item(dd).type != 'image/png' && files.item(dd).type != 'image/jpeg' && files.item(dd).type != 'image/gif') {
      //       this.update_dialog = false
      //       Toast({
      //         message:'图片格式无法识别',
      //         duration:1000
      //       })
      //       return false
      //     }
      //
      //     if (files.item(dd).size > imgLimit * 102400) {
      //       this.update_dialog = false
      //       Toast({
      //         message:'图片太大',
      //         duration:1000
      //       })
      //       return false
      //     } else {
      //       image.src = window.URL.createObjectURL(files.item(dd));
      //       image.onload = function () {
      //         // 默认按比例压缩
      //         let w = image.width,
      //           h = image.height,
      //           scale = w / h;
      //         w = 200;
      //         h = w / scale;
      //         // 默认图片质量为0.7，quality值越小，所绘制出的图像越模糊
      //         let quality = 0.7;
      //         //生成canvas
      //         let canvas = document.createElement('canvas');
      //         let ctx = canvas.getContext('2d');
      //         // 创建属性节点
      //         let anw = document.createAttribute("width");
      //         anw.nodeValue = w;
      //         let anh = document.createAttribute("height");
      //         anh.nodeValue = h;
      //         canvas.setAttributeNode(anw);
      //         canvas.setAttributeNode(anh);
      //         ctx.drawImage(image, 0, 0, w, h);
      //         let ext = image.src.substring(image.src.lastIndexOf(".") + 1).toLowerCase();//图片格式
      //         // let base64 = canvas.toDataURL("image/" + ext, quality);
      //         sessionStorage.setItem('img_base64', canvas.toDataURL("image/" + ext, quality))
      //         // 回调函数返回base64的值
      //       }
      //     }
      //
      //
      //   }
      // },


      upload() {
        this.update_dialog = true
        this.add_dialog = false
      },
      fill() {
        console.log('手动录入')
        this.add_dialog = false
        this.$router.push('/create')
      },

      jump2body() {
        this.$router.push('/mybody')
      },

      showDetails(e) {
        console.log(e)
        this.$store.commit('getId', this.showData[e].id)
        this.$router.push('/detail')
      },

      choose(e) {
        this.name = this.namelist[e].name
        this.$store.commit('getName', this.namelist[e].name)
        this.show_dialog = false
      },

      getinfo() {
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/getinfo',
          data: {
            user: this.$store.state.loginState
          }
        }).then(res => {
          console.log(res)
          Toast({
            message: '刷新数据成功',
            duration: 1000
          })
          this.showData = res.data
          this.name = res.data[0].name
        }).catch(err => {
          console.log(err)
        })
      },

      share(e) {
        // console.log(e)
        this.$axios({
          method: 'post',
          url: 'http://localhost:3000/share',
          data: {
            id: this.showData[e].id,
            status: this.showData[e].share
          }
        }).then(res => {
          if (res.data == 'success') {
            this.getinfo()
          } else {
            Toast({
              message: '操作失败，稍后再试',
              duration: 1000
            })
          }
        }).catch(err => {
          console.log(err)
          Toast({
            message: 'Network error',
            duration: 1000
          })
        })
      }
    }
  }
</script>

<style scoped>
  .upload_name{
    width: 5rem;
    height: 0.5rem;
    font-size: 8px;
    line-height: 0.5rem;
    text-align: center;
    position: absolute;
    top: 3.2rem;
    left: 0.25rem;
    overflow: hidden;
  }

  .upload_confirm{
    width: 1.5rem;
    height: 0.8rem;
    color: white;
    background-color: rgb(129, 163, 234);
    font-size: 20px;
    line-height: 0.8rem;
    text-align: center;
    border-radius: 0.1rem;
    position: absolute;
    left: 1rem;
    bottom: 1rem;
  }

  .upload_cancel{
    width: 1.5rem;
    height: 0.8rem;
    color: white;
    background-color: rgb(168,168,168);
    font-size: 20px;
    line-height: 0.8rem;
    text-align: center;
    border-radius: 0.1rem;
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }

  .upload_input{
    position: absolute;
    top: 1rem;
    left: 0.75rem;
    width: 4rem;
    height: 2rem;
    opacity: 0;
  }

  .upload_content{
    width: 4rem;
    height: 2.5rem;
    border: 0.1rem dashed rgb(135,135,135);
    color: rgb(135,135,135);
    box-sizing: border-box;
    position: absolute;
    top: 0.6rem;
    left: 0.75rem;
    border-radius: 0.2rem;
    font-size: 0.5rem;
    font-weight: bold;
    text-align: center;
    line-height: 2.3rem;
  }

  .upload_dialog{
    width: 5.5rem;
    height: 5.5rem;
    position: fixed;
    top: 3rem;
    left: 1rem;
    border-radius: 0.3rem;
    background-color: #fff;
  }

  .time::after, .suit::after, .cure::after, .share::after {
    content: "";
    width: 0.15rem;
    height: 0.15rem;
    border-radius: 100%;
    position: absolute;
    top: 9px;
    left: -0.35rem;
    background: rgb(216, 216, 216);
  }

  .line_top {
    height: 0.35rem;
    width: 0;
    color: #333333;
    border: 1px solid rgb(216, 216, 216);
    position: absolute;
    left: 0.5rem;
    top: 0.9rem;
  }

  .line_mid {
    height: 0.35rem;
    width: 0;
    color: #333333;
    border: 1px solid rgb(216, 216, 216);
    position: absolute;
    left: 0.5rem;
    top: 1.6rem;
  }

  .line_bom {
    height: 0.35rem;
    width: 0;
    color: #333333;
    border: 1px solid rgb(216, 216, 216);
    position: absolute;
    left: 0.5rem;
    top: 2.3rem;
  }

  .background {
    width: 7.5rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .jump2body {
    position: absolute;
    top: 0.8rem;
    right: 0.4rem;
    height: 0.7rem;
    width: 1.4rem;
    border-radius: 0.7rem;
    background-color: rgba(255, 255, 255, 0.3);
    font-size: 14px;
    color: white;
    line-height: 0.7rem;
    text-align: center;
    z-index: 3;
  }

  .showname {
    position: absolute;
    top: 2rem;
    left: 1.8rem;
    font-size: 30px;
    color: white;
  }

  .icon {
    position: absolute;
    top: 2rem;
    left: 0.4rem;
    width: 1rem;
    height: 1rem;
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

  .time {
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 0.5rem;
  }

  .suit {
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 1.2rem;
  }

  .cure {
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 1.9rem;
  }

  .share {
    font-size: 18px;
    color: rgb(135, 135, 135);
    position: absolute;
    left: 0.8rem;
    top: 2.6rem;
  }

  .refresh {
    position: fixed;
    z-index: 100;
    right: 0.5rem;
    bottom: 3.1rem;
    width: 1rem;
    height: 1rem;
  }

  .add {
    position: fixed;
    z-index: 100;
    right: 0.5rem;
    bottom: 1.7rem;
    width: 1rem;
    height: 1rem;
  }

  .black {
    height: 1rem;
  }

  .dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .dialog_container {
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

  .dialog_item {
    margin: 0 auto;
    list-style: none;
    height: 1rem;
    width: 80%;
    line-height: 1rem;
    border-bottom: gainsboro 1px solid;
    font-size: 16px;
    color: darkgrey;
    text-align: center;
  }

  .add_card {
    width: 100%;
    height: 6.5rem;
    border-radius: 0.2rem 0.2rem 0 0;
    background-color: rgb(246, 246, 246);
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .upload {
    width: 2.9rem;
    height: 2.3rem;
    position: absolute;
    top: 1rem;
    left: 0.85rem;
    text-align: center;
  }

  .camera {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0.7rem;
    top: 0.4rem;
  }

  .camera_text {
    font-size: 14px;
    margin-top: 2rem;
  }

  .fill {
    width: 2.9rem;
    height: 2.3rem;
    position: absolute;
    top: 1rem;
    right: 0.85rem;
    text-align: center;
  }

  .font {
    width: 1.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0.7rem;
    top: 0.4rem;
  }

  .font_text {
    font-size: 14px;
    margin-top: 2rem;
  }

  .cancel {
    width: 1.1rem;
    height: 1.1rem;
    position: absolute;
    left: 3.2rem;
    bottom: 1rem;
  }

  .remind {
    color: rgb(171, 171, 171);
    font-size: 24px;
    width: 7rem;
    height: 3rem;
    text-align: center;
    /*border: 0.1rem dashed rgb(171, 171, 171);*/
    border-radius: 0.5rem;
    line-height: 2.8rem;
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    box-sizing: border-box;
    font-weight: bolder;
  }

</style>
