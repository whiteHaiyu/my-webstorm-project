<template>
  <div class="mine-container">
    <div class="mine-card">
      <div class="mine-card-icon" :style="'background-color:' + userInfo.icon">{{ userIcon }}</div>
      <div class="mine-card-name" >{{ userInfo.name }}</div>
      <div class="mine-card-label" >{{ userInfo.label }}</div>
    </div>
    <div>
      <van-cell icon="contact" title="个人资料" is-link @click="$router.push('/myspace-personal')" />
      <van-cell icon="paid" title="账号安全" is-link @click="$router.push('/myspace-accountNum')" />
      <van-cell icon="setting-o" title="记账设置" is-link @click="$router.push('/myspace-setting')" />
      <van-cell icon="service-o" title="帮助反馈" is-link @click="$router.push('/myspace-help')" />
      <van-cell icon="point-gift-o" title="爱的鼓励" is-link @click="$router.push('/myspace-about')" />
    </div>
  </div>
</template>

<script>
export default {
  name: "mine",
  data() {
    return {
      userInfo: {
        name: "wangHaiyu",
        icon: "#CCCCCC",
        label: "最长二十字最长二十字最长二十字最长二十字"
      }
    };
  },
  computed:{
    userIcon(){
      return this.userInfo.name.slice(0,1).toUpperCase()
    }
  },
  methods:{

  }
};
</script>

<style lang="stylus" scoped>
.mine-card
  height 150px
  width 100%
  position relative
  background-color rgb(238, 241, 247)
  .mine-card-icon
    width 70px
    heigt 70px
    border-radius 50%
    position absolute
    font-size 30px
    text-align center
    line-height 70px
    top 40px
    left 30px
  .mine-card-name
    position absolute
    top 40px
    left 120px
    font-size 24px
  .mine-card-label
    position absolute
    top 80px
    left 120px
    font-size 16px
    color #999999
    margin-right 15px
</style>