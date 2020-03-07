<template>
  <footer class="footer">
    <ul class="button-list">
      <li v-for="(item, index) in links" :key=index>
          {{item}}
      </li>
    </ul>
    <div class="footer-copyright">
        {{ new Date().getFullYear() }} - <strong>aibook</strong>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => ({
    links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"]
  })
};
</script>

<style lang="stylus" scoped>
@import '../styles/init.stylus'; // 初始化导航栏参数
.footer
    width 100%
    color $footerTextColor
    .button-list
        display flex
        justify-content center
        align-items center
        flex-wrap wrap
        background-color $footerBg
        padding 10px
        li
            list-style none
            padding 5px 10px
            margin 0 25px
            cursor pointer
            // border 1px solid #000
            border-radius 20px
        li:hover
            background-color $footerTextHover
    .footer-copyright
        display flex
        justify-content center
        align-items center
        background-color $footerCopyrightBg
        padding 15px
        white-space pre


</style>
