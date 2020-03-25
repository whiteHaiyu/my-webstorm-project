<template>
  <div>
    <van-nav-bar left-text="记账设置" left-arrow @click-left="$router.go(-1)" />
    <van-cell title="总预算提醒">
      <div style="float:right">
        <van-switch v-model="totalBudget" />
      </div>
    </van-cell>
    <van-collapse v-if="totalBudget" v-model="totalBudgetRemind">
      <van-collapse-item title="提醒阈值" name="1">
        <van-radio-group v-model="totalBudgetRadio">
          <van-cell-group>
            <van-cell title="80%" clickable @click="totalBudgetRadio = '1'">
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell title="90%" clickable @click="totalBudgetRadio = '2'">
              <van-radio slot="right-icon" name="2" />
            </van-cell>
            <van-cell title="100%" clickable @click="totalBudgetRadio = '3'">
              <van-radio slot="right-icon" name="3" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-collapse-item>
    </van-collapse>
    <van-cell title="子预算提醒">
      <div style="float:right">
        <van-switch v-model="childBudget" />
      </div>
    </van-cell>
    <van-collapse v-if="childBudget" v-model="totalBudgetRemind">
      <van-collapse-item title="提醒阈值" name="1">
        <van-radio-group v-model="totalBudgetRadio">
          <van-cell-group>
            <van-cell title="80%" clickable @click="totalBudgetRadio = '1'">
              <van-radio slot="right-icon" name="1" />
            </van-cell>
            <van-cell title="90%" clickable @click="totalBudgetRadio = '2'">
              <van-radio slot="right-icon" name="2" />
            </van-cell>
            <van-cell title="100%" clickable @click="totalBudgetRadio = '3'">
              <van-radio slot="right-icon" name="3" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-collapse-item>
    </van-collapse>

    <div style="margin: 100px 16px 0 16px;">
      <van-button block color="#E58B37">保存</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "setting",
  data() {
    return {
      totalBudget: true,
      totalBudgetRemind: [],
      totalBudgetRadio: "",
      childBudget: true
    };
  }
};
</script>

<style lang="stylus" scoped></style>