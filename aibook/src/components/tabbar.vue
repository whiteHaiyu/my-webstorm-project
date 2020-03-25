<template>
  <div class="header">
      <div class="header-container">
          <div class="header-container-gift">
              <img src="../assets/gift.png">{{ $t("home.gift") }}
          </div>
          <div class="header-container-girls">{{ $t("home.forGirls") }}</div>
          <div class="header-container-icon">
              <img src="../assets/logo-sass.png" >
          </div>
          <div class="header-container-boys">{{ $t("home.forBoys") }}</div>
          <div class="header-container-shop">
              <img src="../assets/shop.png" alt="">
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:"tabbar",
    data(){
        return{

        }
    }
}
</script>

<style lang="stylus" scoped>
.header
    width 100%
    position fixed
    top 0
    left 0
    z-index 10
    .header-container
        max-width 1200px
        margin 0 auto
        display flex
        justify-content space-between
        align-items center
        background none
        font-size 16px
        font-weight 600
        color #ffffff
        padding-top 10px
        .header-container-gift
            display flex
            align-items center
        .header-container-gift>img ,.header-container-shop>img
            width 30px
            height 30px
            margin 5px
        .header-container-icon>img
            width 80px
            height 50px

</style>