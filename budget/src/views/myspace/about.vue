<template>
  <div>
    <van-nav-bar left-text="爱的鼓励" left-arrow @click-left="$router.go(-1)" />
    <div class="about-container">
      <img :src="require('../../assets/logo.png')" class="about-icon" />
      <div>梧桐预算</div>
      <div>版本：v1.0.0</div>
    </div>
    <van-cell title="版本更新">
      <div style="float:right">已是最新版本</div>
    </van-cell>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="关于我们" name="1">
        
      </van-collapse-item>
      <van-collapse-item title="五星好评" name="2">
        
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
    name:'about',
    data(){
        return{
          activeNames:[]
        }
    },

}
</script>

<style lang="stylus" scoped>
.about-container
  height 200px
  text-align center
  font-size 15px
  color #999999
  .about-icon
    // display block
    margin 30px auto
    width 70px
    height 70px
    border-radius 50%
</style>