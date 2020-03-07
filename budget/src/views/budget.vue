<template>
  <div style="padding-bottom:65px">
    <div class="addBudget" @click="$router.push('create_budget')"></div>

    <div class="budget_basic_info">
      <img class="budget_basic_info_statistics" src="../assets/budget/statistics.png">
      <div class="budget_basic_info_day">{{ day }}</div>
      <div class="budget_basic_info_week">{{ week }}</div>
      <div class="budget_basic_info_getData">{{ getData }}</div>
      <div class="budget_basic_info_leftBudget">剩余预算 {{ userInfo.leftBudget }}</div>
      <div class="budget_basic_info_todayExpend">今日支出 <span style="font-size:20px">{{ userInfo.todayExpend }}</span></div>
      <div class="budget_basic_info_monthBalance">本月结余 {{ userInfo.monthBalance }}</div>
    </div>

    <div class="budget_mybudget">
      <div class="budget_mybudget_header">
        <div class="budget_mybudget_kind">个人账本</div>
        <div class="budget_mybudget_add" @click="$router.push('create_ledger/personal')">+</div>
      </div>
      <div class="budget_card" v-if="ledgerList.length == 0">
        <div class="budget_card_tips">暂无账本</div>
      </div>
      <div class="budget_card" style="background-color:white; overfloat:hidden" v-for="(item, index) in ledgerList" :key="index">
        <div class="budget_card_main"  @click="item.autoShow = !item.autoShow">
          <van-icon class="budget_card_modify" name="edit" />
          <div class="budget_card_title">{{ item.name }}</div>
          <div class="budget_card_dailyLeft">日均剩余<span class="tips">{{item.dailyRemain}}</span></div>
          <div class="budget_card_settlement">距结算日<span class="tips">{{item.settlementDate}}天</span></div>
          <div class="budget_card_process">
            <el-progress :show-text="false" :stroke-width="8" :percentage="getPercentage(item.used, item.total)" :status="getProcessType(item.used, item.total)"></el-progress>
          </div>
        </div>
          
        <transition name="sub-comments">
          <div class="budget_card_details" v-show="item.autoShow">
            <div class="budget_card_details_btn">
              <div class="budget_card_details_btn_left">调整预算</div>
              <div class="budget_card_details_btn_right">消费详单</div>
            </div>
            <div class="budget_card_details_lsititem" v-for="(item2, index2) in item.budgetDetail" :key="index2">
              <div class="budget_card_details_lsititem_used">{{item2.used}}</div>
              <div class="budget_card_details_lsititem_total">{{item2.total}}</div>
              <div class="budget_card_details_lsititem_name">{{ item2.name }}</div>
              <div class="budget_card_details_lsititem_process">
                <el-progress :show-text="false" :stroke-width="18" :percentage="getPercentage(item2.used, item2.total)" :status="getProcessType(item2.used, item2.total)"></el-progress>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>

    <div class="budget_mybudget">
      <div class="budget_mybudget_header">
        <div class="budget_mybudget_kind">共享账本</div>
        <div class="budget_mybudget_add" @click="$router.push('create_ledger/shared')">+</div>
      </div>
      <div class="budget_card" v-if="sharedLedgerList.length == 0">
        <div class="budget_card_tips">暂无账本</div>
      </div>
      <div class="budget_card" style="background-color:white; overfloat:hidden" v-for="(item, index) in sharedLedgerList" :key="index">
        <div class="budget_card_main"  @click="item.autoShow = !item.autoShow">
          <van-icon class="budget_card_modify" v-if="item.created" name="edit" />
          <div class="budget_card_title">{{ item.name }}</div>
          <div class="budget_card_dailyLeft">日均剩余<span class="tips">{{item.dailyRemain}}</span></div>
          <div class="budget_card_settlement">距结算日<span class="tips">{{item.settlementDate}}天</span></div>
          <div class="budget_card_process">
            <el-progress :show-text="false" :stroke-width="8" :percentage="getPercentage(item.used, item.total)" :status="getProcessType(item.used, item.total)"></el-progress>
          </div>
          <div class="budget_card_cooperation">
            <div class="budget_card_cooperation_item" v-for="(item3, index3) in item.cooperation" :key="index3">{{ item3.slice(0,1).toUpperCase() }}</div>
            <div class="budget_card_cooperation_item" style="background-color:#FFF;border 3px solid #5d5d5d" v-if="item.created"><van-icon name="plus" color="#d5d5d5" style="font-wight:1000"/></div>
          </div>
        </div>
          
        <transition name="sub-comments">
          <div class="budget_card_details" v-show="item.autoShow">
            <div class="budget_card_details_btn">
              <div class="budget_card_details_btn_left">调整预算</div>
              <div class="budget_card_details_btn_right">消费详单</div>
            </div>
            <div class="budget_card_details_lsititem" v-for="(item2, index2) in item.budgetDetail" :key="index2">
              <div class="budget_card_details_lsititem_used">{{item2.used}}</div>
              <div class="budget_card_details_lsititem_total">{{item2.total}}</div>
              <div class="budget_card_details_lsititem_name">{{ item2.name }}</div>
              <div class="budget_card_details_lsititem_process">
                <el-progress :show-text="false" :stroke-width="18" :percentage="getPercentage(item2.used, item2.total)" :status="getProcessType(item2.used, item2.total)"></el-progress>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  
  </div>
</template>

<script>
export default {
  name: "budget",
  data:() => {
    return{
      day: new Date().getDate(),
      week:'星期'+'日一二三四五六'.charAt(new Date().getDay()),
      userInfo:{
        leftBudget:120,
        todayExpend:15.23,
        monthBalance: '+1100',
      },
      ledgerList:[
        {
          ledgerId: 1,
          name:"生活账本",
          dailyRemain: 110,
          settlementDate: 5,
          total:4000,
          used:2460,
          autoShow: false,
          budgetDetail: [
            {
              name: "账本详情1",
              total: 2000,
              used: 1230,
            },
            {
              name: "账本详情2",
              total: 2000,
              used: 230,
            }
          ]
        },
        {
          ledgerId: 2,
          name:"娱乐账本",
          dailyRemain: 110,
          settlementDate: 5,
          total:4000,
          used:3460,
          autoShow: false,
          budgetDetail: [
            {
              name: "账本详情1",
              total: 2000,
              used: 1230,
            },
            {
              name: "账本详情2",
              total: 2000,
              used: 230,
            }
          ]
        }
      ],

      sharedLedgerList:[
        {
          ledgerId: 1,
          name:"生活账本",
          dailyRemain: 110,
          settlementDate: 5,
          total:4000,
          used:2460,
          autoShow: false,
          created: true,
          cooperation:['wanghaiyu','tianfenghua'],
          budgetDetail: [
            {
              name: "账本详情1",
              total: 2000,
              used: 1230,
            },
            {
              name: "账本详情2",
              total: 2000,
              used: 230,
            }
          ]
        },
        {
          ledgerId: 1,
          name:"生活账本",
          dailyRemain: 110,
          settlementDate: 5,
          total:4000,
          used:2460,
          autoShow: false,
          created: false,
          cooperation:['wanghaiyu','tianfenghua'],
          budgetDetail: [
            {
              name: "账本详情1",
              total: 2000,
              used: 1230,
            },
            {
              name: "账本详情2",
              total: 2000,
              used: 230,
            }
          ]
        },
      ]
      
    }
  },
  computed:{
    getData:()=>{
      let date = new Date()
      let monthsList = ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
      return monthsList[date.getMonth()] + " " + date.getFullYear()
    },

  },
  mounted(){

  },
  methods:{
    getPercentage:(used, total) => {
      if(used >= total){
        return 100
      }else{
        return Math.floor(100*used/total)
      }
    },

    getProcessType:(used, total) => {
      let percentage = used/total
      if(percentage >= 0 && percentage < 0.5){
        return "success"
      }else if(percentage >= 0.5 && percentage < 0.7){
        return "warning"
      }else{
        return "exception"
      }
    }
  }
};
</script>

<style lang='stylus' scoped>
  .addBudget
    width 45px
    height 45px
    position fixed
    right 15px
    bottom 70px
    border-radius 100%
    border 1px solid #E58B37
    background url("../assets/budget/addBudget.png") center center
    background-size 85%
    background-color #FFFFFF
    z-index 9999
  .budget_basic_info
    padding 36px 20px 10px 20px
    position relative
    box-sizing border-box
    height 140px
    background-color rgb(238, 241, 247)
    .budget_basic_info_statistics
      position absolute
      top 10px
      right 10px
      width 30px
      height 30px
    .budget_basic_info_day
      font-size 30px
    .budget_basic_info_week
      font-size 14px
      position absolute
      top 40px
      left 60px
    .budget_basic_info_getData
      font-size 14px
      position absolute
      top 55px
      left 60px
    .budget_basic_info_leftBudget
      font-size 16px
      position absolute
      top 45px
      left 200px
    .budget_basic_info_todayExpend
      font-size 16px
      position absolute
      top 95px
      left 15px
    .budget_basic_info_monthBalance
      font-size 16px
      position absolute
      top 98px
      left 200px

  .budget_mybudget
    padding 8px 10px
    .budget_mybudget_header
      width 100%
      height 30px
      .budget_mybudget_kind
        float left
        font-size 16px
      .budget_mybudget_add
        float right
        font-size 24px
        font-weight 880
        line-height 22px
    .budget_card
      border 1px solid rgb(225, 225, 225)
      border-radius 7px
      padding 0px 8px
      margin 8px 0
      box-shadow 0px 0px 5px rgb(225, 225, 225)
      .budget_card_tips
        text-align center
        font-size 16px
        line-height 40px
        height 35px
      .budget_card_main
        transform translateY(-5px)
        .budget_card_modify
          position absolute
          right 5px
          top 10px
          font-size 16px
        .budget_card_title
          display inline-block
          width 33%
          height 40px
          font-size 18px
          transform translateY(8px)
        .budget_card_dailyLeft
          display inline-block
          width 33%
          height 40px
          font-size 14px 
          position relative
          .tips
            position absolute
            top 20px
            left 50%
            font-size 16px
        .budget_card_settlement
          display inline-block
          width 33%
          height 40px
          font-size 14px
          position relative
          .tips
            position absolute
            top 20px
            left 50%
            font-size 16px
        .budget_card_process
          display block
          margin 5px 0
          width 100%
        .budget_card_cooperation
          width 100%
          height 45px
          padding 5px
          .budget_card_cooperation_item
            display inline-block
            width 30px
            height 30px
            line-height 30px
            margin-right 10px
            font-size 16px
            background-color red
            // border 1px dashed #d5d5d5
            text-align center
            border-radius 50%
    .budget_card_details
      .budget_card_details_btn
        width 100%
        height 30px
        font-size 16px
        margin-top 15px
        padding-top 10px
        border-top 1px solid rgb(203, 203, 203)
        .budget_card_details_btn_left
          float left
          color #344D99
        .budget_card_details_btn_right
          float right 
          color #E58B37
    .budget_card_details_lsititem
      display flex
      justify-content center
      margin 5px 0 15px 0
      position relative
      .budget_card_details_lsititem_used
        position absolute
        left 22%
        z-index 999
        font-size 12px
        color white
      .budget_card_details_lsititem_total
        position absolute
        right 2%
        z-index 999
        font-size 12px
      .budget_card_details_lsititem_name
        width 20%
        display inline-block
        font-size 14px
      .budget_card_details_lsititem_process
        width 80%
        min-height 10px 
        display inline-block
      


.sub-comments-leave-active,.sub-comments-enter-active {
        transition: opacity 0.5s ease;
    }
    .sub-comments-enter,.sub-comments-leave-to {
        opacity  0
    }
    .sub-comments-enter-to,.sub-comments-leave {
       opacity 1
    }


</style>
