<!--导航栏-->
<template>
  <div class="app">
    <div class="navigation">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="rgb(50, 64, 83)"
          text-color="#fff"
          active-text-color="rgb(33, 152, 207)">
          <el-menu-item index="1">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item index="2-1">用户管理</el-menu-item>
            <el-menu-item index="2-2">日志管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span slot="title">车辆管理</span>
            </template>
            <el-menu-item index="3-1">租赁中车辆列表</el-menu-item>
            <el-menu-item index="3-2">非租赁车辆列表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span slot="title">工单管理</span>
            </template>
            <el-menu-item index="4-1">加油工单</el-menu-item>
            <el-menu-item index="4-2">保养工单</el-menu-item>
            <el-menu-item index="4-3">维修工单</el-menu-item>
            <el-menu-item index="4-4">调度工单</el-menu-item>
            <el-menu-item index="4-5">预警工单</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span slot="title">网点管理</span>
            </template>
            <el-menu-item index="5-1">网点信息</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location-outline"></i>
              <span slot="title">运维人员管理</span>
            </template>
            <el-menu-item index="6-1">人员信息</el-menu-item>
          </el-submenu>
        </el-menu>
    </div>
    <div class="content">
      <p class="username">欢迎您！&nbsp;&nbsp;<span class="username-n">{{this.$store.state.username}}</span></p>
      <img src="../assets/icon.png" class="icon">
      <div class="router">{{router_title}}</div>
      <div class="info"><el-button type="warning" size="mini">通知</el-button>
        <marquee class="info-content" direction="up" scrollamount="1">&nbsp;&nbsp;&nbsp;&nbsp;新系统即将上线，敬请期待！</marquee>
      </div>
      <router-view></router-view>
<!--      <router-view></router-view>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: "homepage",
      data(){
          return{
            router_title:'首页'
          }
      },

      methods: {
        handleSelect(index){
          console.log(index)
          switch (index) {
            case '1':
              this.router_title = '首页'
              this.$router.replace('/admin/home')
              break
            case '2-1':
              this.router_title = '系统管理 - 用户管理'
              this.$router.replace('/admin/user_admin')
              break
            case '2-2':
              this.router_title = '系统管理 - 日志管理'
              this.$router.replace('/admin/log_admin')
              break
            case '3-1':
              this.router_title = '车辆管理 - 租赁中车辆管理'
              this.$router.replace('/admin/car_admin')
              break
            case '3-2':
              this.router_title = '车辆管理 - 非租赁车辆管理'
              this.$router.replace('/admin/car_admin2')
              break
            case '4-1':
              this.router_title = '工单管理 - 加油工单'
              this.$router.replace('/admin/jiayou_form')
              break
            case '4-2':
              this.router_title = '工单管理 - 保养工单'
              this.$router.replace('/admin/baoyang_form')
              break
            case '4-3':
              this.router_title = '工单管理 - 维修工单'
              this.$router.replace('/admin/weixiu_form')
              break
            case '4-4':
              this.router_title = '工单管理 - 调度工单'
              this.$router.replace('/admin/diaodu_form')
              break
            case '4-5':
              this.router_title = '工单管理 - 预警工单'
              this.$router.replace('/admin/yujing_form')
              break
            case '5-1':
              this.router_title = '网点管理 - 网点信息'
              this.$router.replace('/admin/dotinfo_admin')
              break
            case '6-1':
              this.router_title = '运维人员管理 - 人员信息'
              this.$router.replace('/admin/hr_admin')
              break
            default:
              console.log('click error')
          }
        }
      }
    }
</script>

<style scoped>

  el-menu{
    border-right-width: 0;
  }

  .navigation{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 210px;
    background-color: rgb(50, 64, 83);
    z-index: 1;
  }

  .content{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    left: 209px;
    box-sizing: border-box;
    background-color: #fff;
    padding-right: 209px;
    padding-top: 100px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon{
    width: 40px;
    height: 40px;
    position: absolute;
    right: 240px;
    top: 5px;
    border-radius: 5px;
  }

  .username{
    position: absolute;
    right: 300px;
    top: 10px;
    font-size: 14px;
  }

  .username-n{
    font-weight: bolder;
  }

  .router{
    color: rgb(175, 186, 203);
    position: absolute;
    top: 15px;
    left: 50px;
  }

  .info{
    width: 100%;
    height: 50px;
    background-color:rgb(248, 248, 248);
    position: absolute;
    top: 50px;
    left: 0;
    padding-left: 50px;
    line-height: 50px;
    font-size: 12px;
  }

  .info-content{
    position: absolute;
    top: 10px;
    left: 120px;
    height: 30px;
  }
</style>
