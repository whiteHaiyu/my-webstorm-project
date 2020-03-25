<template>
  <div class="container">
    <div class="find-card" v-for="(item, index) in list" :key="index">
      <img class="find-img" :src="item.img" alt="">
      <div class="find-title">{{item.title}}</div>
      <div class="find-tips">{{item.tips}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "find",
  data(){
    return{
      list:[
        {
          img:require("@/assets/logo.png"),
          title:'如何设置个人日常预算？',
          tips:'#跟我学记账'
        },
        {
          img:require("@/assets/logo.png"),
          title:'如何设置个人日常预算？',
          tips:'#跟我学记账'
        },
        {
          img:require("@/assets/logo.png"),
          title:'如何设置个人日常预算？',
          tips:'#跟我学记账'
        },
        {
          img:require("@/assets/logo.png"),
          title:'如何设置个人日常预算？',
          tips:'#跟我学记账'
        }
      ]
    }
  }
};
</script>

<style lang="stylus" scoped>
.find-card 
  width 90%
  height 100px
  position relative
  margin 0 auto 15px 
  box-shadow 0 0 3px #999
  border-radius 5px
  .find-img
    width 80px
    height 80px
    position absolute
    top 10px
    left 10px
  .find-title
    position absolute
    top 20px
    left 130px
  .find-tips
    position absolute
    top 50px
    left 130px
    font-size 14px
    color #CED6E5
</style>