<template>
  <div style="padding-bottom:65px">
    <!-- <div class="account-header">
      我的资产<van-icon style="float:right" name="plus" color="#E58B37" size="20" />
    </div> -->
    <div class="account-container">
      <div class="account-container-total"><span class="account-container-total-span">净资产<van-icon style="margin-left:15px" size="18" class="account-container-icon" :name="$store.getters.hiddenValue ? 'closed-eye' : 'eye-o'" @click="changeState" /></span>{{ hiddenVal(accountList.netAssets) }}</div>
      <div class="account-container-debt"><span class="account-container-debt-span">负债</span>{{ hiddenVal(accountList.debt) }}</div>
      <div class="account-container-assets"><span class="account-container-assets-span">资产</span>{{ hiddenVal(accountList.assets) }}</div>
      <van-button size="small" round color="#87A7D1" class="account-container-trans" plain @click="trans">转 账</van-button>
    </div>
    <div class="account-details">
      <div>全部账户({{ accountList.accountCount }})<span style="float:right;font-size:24px;font-wight:880;line-height:20px;" @click="$router.push('/chooseAccountType')">+</span></div>
      <div class="account-details-card" v-for="(item, index) in accountList.accountDetail" :key="index">
        <div class="account-details-card-title" @click="item.showDetails = !item.showDetails">
          <div>{{ item.type }}</div>
          <van-icon :name="item.showDetails ? 'arrow-up' : 'arrow-down'" />
        </div>
        <div class="account-details-card-detail" v-show="item.showDetails" v-for="(item2, index2) in item.details" :key="index2" @click="showDetail(item2.id)">
          <div>{{ item2.name }}</div>
          <div>{{ hiddenVal(item2.amount) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "account",
  data() { 
    return{
      hiddenDetails: this.$store.getters.hiddenValue,
      accountList:{
        netAssets:"1211",
        debt:"123",
        assets:"231311111",
        accountCount:5,
        accountDetail:[
          {
            type:"电子账户",
            totalAmount:2300,
            showDetails: true,
            details:[
              {
                id:111,
                name:"支付宝",
                amount:1100
              },
              {
                id:222,
                name:"微信",
                amount:1200
              }
            ]
          },
          {
            type:"现金",
            totalAmount:3000,
            showDetails: true,
            details:[
              {
                id:333,
                name:"现金",
                amount:3000
              }
            ]
          },
          {
            type:"储蓄卡",
            totalAmount:2300,
            showDetails: true,
            details:[
              {
                id:444,
                name:"建设银行",
                amount:1100
              },
              {
                id:555,
                name:"招商银行",
                amount:1200
              }
            ]
          }
        ]
      },
    }
  },

  methods:{

    trans(){
      this.$router.push({path:"/create_budget",query:{target:2}})
    },

    hiddenVal(value){
      return this.$store.getters.hiddenValue ? "****" : value
    },

    changeState(){
      let temp = !this.$store.state.user.hiddenValue
      this.$store.state.user.hiddenValue = temp
    },

    showDetail(val){
      this.$router.push({
        path:"/accountDetail",
        query:{
          id:val
        }
      })
    }

    
  }
};
</script>

<style lang="stylus" scoped>
  .account-header
    text-align center
  .account-container
    height 140px
    width 100%
    position relative
    font-size 16px
    background-color rgb(238, 241, 247)
    .account-container-total
      position absolute
      left 35px
      top 25px
      font-size 20px
      .account-container-total-span
        position absolute
        width 100px
        display inline-block
        top 25px
        font-size 14px
        font-weight lighter
    .account-container-debt
      position absolute
      min-width 100px
      left 35px
      top 100px
      .account-container-debt-span
        display inline-block
        margin-right 5px
        font-weight lighter
    .account-container-assets
      position absolute
      // min-width 100px
      right 35px
      top 100px
      .account-container-assets-span
        display inline-block
        margin-right 5px
        font-weight lighter
    .account-container-trans
      position absolute 
      right 14px
      top 4px
      font-size 16px
      margin 20px
      width 70px
  .account-details
    font-size 16px
    margin-top 2px
    padding 10px
    .account-details-card
      border 1px solid rgb(225, 225, 225)
      border-radius 7px
      margin 10px 0
      box-shadow 0px 0px 5px rgb(225, 225, 225)
      .account-details-card-title
        padding-left 10px 
        padding-right 10px 
        background-color rgb(206, 214, 229)
        display flex
        justify-content space-between
        align-items center
        height 35px
      .account-details-card-detail
        padding-left 20px
        padding-right 20px 
        display flex
        justify-content space-between
        align-items center
        height 35px
        font-size 15px


</style>