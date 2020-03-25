<template>
  <!--xs: phone, sm: pad, md: pc, lg: 2k-pc, xl: 4k-pc-->
  <nav class="header">
    <!-- 顶部导航 -->
    <div class="container">
      <ul class="container-left-ul">
        <li>
          <img id="icon" src="../assets/logo.png"/>
        </li>
        <li :class="$store.state.activeName === item.activeName ? 'menu-item-active' : 'container-left-li'" @click="toActiveMenuItem(item)"
          v-for="(item, index) in leftMenuList" :key="index">
          {{ item.titleName }}
        </li>
      </ul>
      <ul class="container-right-ul">
        <li :class="$store.state.activeName === item.activeName ? 'menu-item-active' : 'container-right-li'" @click="toActiveMenuItem(item)"
          v-for="(item, index) in rightMenuList" :key="index">
          {{ item.titleName }}
        </li>

        <li class='container-right-li' >
          <el-dropdown trigger="click" szie="medium" placement='bottom' @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="fa fa-user"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="!$store.getters.login" command='login' >{{ $t('user.login') }}</el-dropdown-item>
              <el-dropdown-item v-if="$store.getters.login" command='personal' >{{ $t('user.personal') }}</el-dropdown-item>
              <el-dropdown-item v-if="$store.getters.login" command='dropout' >{{ $t('user.dropOut') }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>

        <li id="bars" @click="dropDownShow = !dropDownShow">
          <i class="fa fa-bars fa-lg"/>
        </li>
      </ul>
    </div>

    <!-- 下拉菜单 -->
    <transition name="dropdown-fade-show">
      <div v-show="dropDownShow" class="dropdown">
        <ul class="dropdown-top-ul">
          <li class="dropdown-top-li" v-for="(item, index) in leftMenuList" :key="index" @click="toActiveMenuItem(item)">{{ item.titleName }}</li>
        </ul>
        <!-- <ul class="dropdown-bottom-ul">
          <li class="dropdown-bottom-li" v-for="(item, index) in rightMenuList" :key="index" @click="toActiveMenuItem(item)">{{ item.titleName }}</li>
        </ul> -->
      </div>
    </transition>

  </nav>
</template>


<script>
import { userLogout } from '@/api/user'
export default {
  name: 'Header',
  data:() => ({
      dropDownShow: false, // 控制下拉菜单显示
      leftMenuList: [ // 左侧菜单内容
        { activeName: 'Home', titleName: '主页', activeUrl: '/index' },
        { activeName: 'Infinity', titleName: 'Infinity', activeUrl: '/infinity' },
        { activeName: 'About', titleName: '关于', activeUrl: '/about' }
      ],
      rightMenuList: [ // 右侧菜单内容
        { activeName: 'Support', titleName: '购物车', activeUrl: '/support' }
      ],
      activeName: '' // 导航栏激活名称
  }),
  methods: {
    toActiveMenuItem (item) { // 激活导航菜单
      this.activeName = item.titleName
      this.$router.push(item.activeUrl)
      this.dropDownShow = false
    },

    //处理下拉菜单的点击事件
    handleCommand(command){
      switch(command){
        case 'login':
          this.$router.push('/login')
          break
        case 'personal':
          this.$router.push('/myspace')
          break
        case 'dropout':
          this.doDropout()
          break
        default:
          return
      }
    },

    // 用户注销
    doDropout(){
      let data = {
        token: this.$getToken()
      }
      userLogout(data).then(res => {
        console.log(res)
        if(res.status == 'succeed'){
          this.$removeToken()
          this.$store.commit("SET_LOGIN", false)
          this.$message.success( i18n.t('tips.dropout') )
        }
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../styles/init.stylus" // 初始化导航栏参数
@import "../styles/fade.stylus" // 实现导航栏下拉展示动画效果
.header
  color $headerTextColor
  background $headerBg
  height $header-height
  width 100%
  position fixed
  box-sizing border-box
  top 0
  padding 0 10%
  z-index 999
  .container
    width 100%
    height 100%
    box-sizing border-box
    .container-left-ul
      float left
      li
        height 100%
        line-height $header-height
        width $header-li-width
        display inline-block
        text-align center
      #icon
        height 30px
        vertical-align middle
        transition transform 0.5s
      #icon:hover
        transform scale(1.5, 1.5) rotate(360deg)
      .container-left-li:hover
        color $menu-active-color
        box-shadow 0px -4px 0px $menu-active-color inset
    .container-right-ul
      float right
      li
        height 100%
        line-height $header-height
        width $header-li-width
        display inline-block
        text-align center
      .container-right-li:hover
        color $menu-active-color
        box-shadow:0px -4px 0px $menu-active-color inset
      #bars > i
        padding 8px 14px
        border 1px $headerTextColor solid
        border-radius 5px
  .dropdown
    // border 1px red solid
    width 100%
    padding-left 15px
    background $headerBg
    li
      list-style none
      height 45px
      line-height 45px
    li:hover
      background black

.menu-item-active
  color $menu-active-color
  box-shadow 0px -4px 0px $menu-active-color inset

@media screen and (max-width: 992px) {
  .header {
    padding 0
  }
  .container {
    padding-left 10px
  }
}
@media screen and (max-width: 765px) {
  .container-left-li {
    display none !important
  }
//   .container-right-li {
//     display none !important
//   }
}
@media screen and (min-width: 765px) {
  #bars {
    display none
  }
  .dropdown {
    display none
  }
}
</style>
