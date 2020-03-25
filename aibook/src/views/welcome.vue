<template>
  <div class="welcome">
      <!-- <img class="background" src="../assets/homepage/banner.jpg" /> -->
      <div class="welcome-container">
          {{ $t('welcome.title') }}
          <br>
          {{ $t('welcome.tips') }}
      </div>
      <div class="welcome-input">
          <input class="welcome-input-place" type="text" :placeholder="pleaseHolder" @focus="clearHolder" @blur="resetHolder">
          <div class="welcome-input-btn">{{ $t('welcome.signUp') }}</div>
      </div>
  </div>
</template>

<script>
export default {
    name:"home",
    data(){
        return{
            pleaseHolder:i18n.t('welcome.inputHolder'),
            mail:"",
        }
    },
    methods:{
        clearHolder(){
            this.pleaseHolder = ""
        },
        resetHolder(){
            this.pleaseHolder = i18n.t('welcome.inputHolder')
        }

    }
}
</script>

<style lang="stylus" scoped>
.welcome
    width 100%
    min-width 300px
    height 95vh
    text-align center
    background url("../assets/homepage/banner2.jpg") center center no-repeat
    background-size auto 100%
    position relative
    padding-top 5vh
    overflow hidden
    @media screen and (max-width: 766px)
        background-image url("../assets/homepage/banner2-m.jpg")
    .welcome-container
        font-family "MarkerFelt"
        background url('../assets/homepage/reel.png') center center no-repeat
        background-size auto 100%
        // background-clip content-box
        height 135px
        display flex
        align-items center
        justify-content center
        font-size 25px
        font-weight 600
        white-space nowrap  //强制不换行
        // position absolute
        // top 5vh
        // left 50%
        // transform translateX(-50%)
        @media screen and (max-width: 766px)
            height 230px
            width 90%
            margin 0 auto
            background-size 100% auto
            font-size 15px
            padding 10px
    .welcome-input
        display flex
        align-items center
        justify-content center
        position fixed
        bottom 21%
        left 50%
        transform translateX(-50%)
        @media screen and (max-width: 766px)
            flex-wrap wrap
        .welcome-input-place
            border 3px solid rgb(131, 42, 41)
            background-color rgb(255, 218, 131)
            border-radius 3px
            width 550px
            height 42px
            line-height 42px
            font-size 20px
            font-weight 600
            text-align center
            color #000
            @media screen and (max-width: 766px)
                font-size 13px
                width 350px
        .welcome-input-place::-webkit-input-placeholder
            color #000
        .welcome-input-place:-moz-placeholder
            color #000
        .welcome-input-place:-ms-input-placeholder
            color #000
        .welcome-input-btn
            border 3px solid rgb(131, 42, 41)
            background-color rgb(255, 218, 131)
            border-radius 3px
            width 90px
            height 42px
            line-height 42px
            margin-left 30px
            font-size 20px
            font-weight 600
            text-align center
            cursor pointer
            @media screen and (max-width: 766px)
                margin-top 15px


</style>