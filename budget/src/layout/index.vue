<template>
  <div>
    <div class="mainContainer">
      <transition :name="transitionName" mode="out-in">
        <router-view class="child-view"></router-view>
      </transition>
    </div>

    <van-overlay :show="show">
      <div class="wrapper" @click.stop>
        <van-loading size="24px" vertical>加载中...</van-loading>
      </div>
    </van-overlay>

    <van-tabbar v-model="active" inactive-color="#344D99" active-color="#E58B37">
      <van-tabbar-item v-for="(item, index) in tabbars" :key="index" @click="clickBtn(item.name)">
        <span class="icon-title">{{ item.title }}</span>
        <img
          class="icon-img"
          slot="icon"
          slot-scope="props"
          :src="props.active ? item.active : item.normal"
        />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layout",
  data: () => {
    return {
      show: true,
      active: 1,
      transitionName: "",
      tabbars: [
        {
          name: "budget",
          title: "预算",
          normal: require("../assets/tabbarBtn/budget.png"),
          active: require("../assets/tabbarBtn/budget_active.png")
        },
        {
          name: "account",
          title: "账户",
          normal: require("../assets/tabbarBtn/account.png"),
          active: require("../assets/tabbarBtn/account_active.png")
        },
        {
          name: "find",
          title: "发现",
          normal: require("../assets/tabbarBtn/find.png"),
          active: require("../assets/tabbarBtn/find_active.png")
        },
        {
          name: "mine",
          title: "我的",
          normal: require("../assets/tabbarBtn/mine.png"),
          active: require("../assets/tabbarBtn/mine_active.png")
        }
      ]
    };
  },

  watch: {
    // 监听路由，判断左右切换顺序
    $route(to, from) {
      this.getActiveIndex(to.name);
      if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "slide-right";
      }
    }
  },

  created() {
    this.show = false;
    this.getActiveIndex(this.$route.name);
  },

  methods: {
    // 获取当前点击的按钮
    getActiveIndex(name) {
      for (let key in this.tabbars) {
        if (this.tabbars[key].name == name) {
          this.active = parseInt(key);
        }
      }
    },

    clickBtn(uri) {
      if(this.$route.path.slice(1) != uri){
        this.$router.replace(uri)
      }
    }
  }
};
</script>

<style scoped>
html body {
  margin: 0;
  padding: 0;
}

/* 左右切换动画效果 */
.mainContainer {
  overflow-x: hidden;
}

.child-view {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(50px, 0, 0);
  -webkit-transform: translate(50px, 0, 0);
}

.slide-right-enter,
.slide-left-leave-active {
  opacity: 0;
  transform: translate(-50px, 0, 0);
  -webkit-transform: translate(-50px, 0, 0);
}

.icon-img {
  width: 28px;
  height: 28px;
  margin: 0;
}

.icon-title {
  font-size: 9px;
  display: inline-block;
  transform: translateY(-3px);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 120px;
  height: 120px;
  background-color: #fff;
}

.van-overlay {
  z-index: 999 !important;
}
</style>