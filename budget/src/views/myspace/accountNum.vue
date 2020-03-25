<template>
  <div>
    <van-nav-bar left-text="账号安全" left-arrow @click-left="$router.go(-1)" />
    <van-cell title="邮箱">
      <div class="email">{{ email }}</div>
    </van-cell>
    <van-collapse v-model="activeNames">
      <van-collapse-item title="修改密码" name="1">
        <van-field
          clickable
          v-model="password.old"
          label="旧密码"
          placeholder="请输入旧密码"
          input-align="right"
        />
        <van-field
          clickable
          v-model="password.new"
          label="新密码"
          placeholder="请输入新密码"
          input-align="right"
        />
        <van-field
          clickable
          v-model="password.confirm"
          label="确认密码"
          placeholder="请再次输入新密码"
          input-align="right"
        />
        <div style="margin: 26px ;text-align:center">
          <van-button
            size="small"
            round
            color="#CED6E5"
            style="margin:20px; width:100px;"
            @click="sureBtn"
          >取消</van-button>
          <van-button
            size="small"
            round
            color="#E58B37"
            style="margin:20px; width:100px;"
            @click="sureBtn"
          >确定</van-button>
        </div>
      </van-collapse-item>
      <van-collapse-item title="注销账户" name="2">
        <van-cell title="注销后将无法恢复，请谨慎选择"></van-cell>
        <div style="margin: 26px ;text-align:center">
        <van-button
          size="small"
          round
          color="#CED6E5"
          style="margin:20px; width:100px;"
          @click="sureBtn"
        >取消</van-button>
        <van-button
          size="small"
          round
          color="#E58B37"
          style="margin:20px; width:100px;"
          @click="sureBtn"
        >确定</van-button>
        </div>
      </van-collapse-item>
    </van-collapse>

    <div style="margin: 100px 16px 0 16px;">
      <van-button block color="#E58B37">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "accountNum",
  data() {
    return {
      email: "wanghaiyu@why.com",
      activeNames: [],
      password: {
        old: "",
        new: "",
        confirm: ""
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
.email {
  float: right;
}
</style>