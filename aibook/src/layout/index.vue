<template>
  <div class="layout">
    <tab-bar></tab-bar>
    <div id="main-container">
      <router-view></router-view>
    </div>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import tabBar from "../components/header"
import footerBar from "../components/footer"

export default {
  name:"layout",
  components:{
    tabBar,
    footerBar
  }
}
</script>

<style lang="stylus">
@import "../styles/init.stylus" // 初始化导航栏参数
.layout
  #main-container
    padding-top $header-height
    overflow hidden
    min-height calc(80vh)
</style>

