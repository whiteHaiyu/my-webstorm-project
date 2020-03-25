<template>
  <div>
    <van-nav-bar left-text="帮助反馈" left-arrow @click-left="$router.go(-1)" />
    <van-cell title="联系邮箱">
        <div class="email">TianFH@gmail.com</div>
      </van-cell>
  </div>
</template>

<script>
export default {
    name:'help',
    data(){
        return{

        }
    },

}
</script>

<style lang="stylus" scoped>
.email
  float right
</style>