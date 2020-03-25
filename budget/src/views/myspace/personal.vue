<template>
  <div>
    <van-nav-bar left-text="个人资料" left-arrow @click-left="$router.go(-1)" />
    <van-cell-group>
      <van-cell title="头像(点击选择颜色)">
        <div class="icon-color" :style="'background-color:'+data.icon"></div>
      </van-cell>
      <van-field label="昵称" v-model="data.nickName" placeholder="请输入用户名" input-align="right" />
      <van-field
        v-model="data.target"
        rows="2"
        autosize
        label="记账小目标"
        type="textarea"
        maxlength="20"
        placeholder="输入记账小目标，更有利于小目标实现"
        show-word-limit
      />
    </van-cell-group>

    <div style="margin: 100px 16px 0 16px;">
      <van-button block color="#E58B37">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "personalInfo",
  data() {
    return {
      data: {
        nickName: "",
        target: "",
        icon: "#CCCCCC"
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.icon-color {
  width: 30px;
  height: 20px;
  border: 1px solid black;
  float: right;
}
</style>