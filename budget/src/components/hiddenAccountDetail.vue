<template>
  <div>
      <div class="menu-head" @click="showDetails = !showDetails">
          <div class="menu-head-month">{{ $moment(list.date).format('MMM') }}</div>
          <div class="menu-head-year">{{ $moment(list.date).format('YYYY') }}年</div>
          <div class="menu-head-input">流入：{{ list.input }}</div>
          <div class="menu-head-output">流出：{{ list.output }}</div>
          <div class="menu-head-total">{{ totalFee }}</div>
          <van-icon class="menu-head-icon" v-show="list.details" :name="showDetails ? 'arrow-down':'arrow'" />
      </div>
      <div class="menu-item" v-for="(item, index) in list.details" :key="index" v-show="showDetails">
          <div class="menu-item-date">{{ $moment(item.date).format("MMMDo dddd") }}</div>
          <div class="menu-item-total">{{ item.total }}</div>
          <div class="menu-item-details" v-for="(item2, index2) in item.dailyDetail" :key="index2">
              <div class="menu-item-details-type">{{ item2.type }}</div>
              <div class="menu-item-details-amount">{{ item2.amount }}</div>
          </div>
      </div>
      
  </div>
</template>

<script>
export default {
    name:"hiddenAccountDetail",
    data:() => {
        return{
            showDetails: false
        }
    },
    props:["list"],
    computed:{
        totalFee(){
            return this.list.input - this.list.output
        }
    },
    methods:{
        getId(value){
            this.$emit('func',value)
        }
    }
}
</script>

<style lang="stylus" scoped>
.menu-head
    position relative
    height 65px
    font-size 12px
    color rgb(120, 120, 120)
    border-bottom 1px solid rgb(235, 235, 235)
    .menu-head-month
        position absolute
        top 15px
        left 20px
        font-size 14px
        color black
    .menu-head-year
        position absolute
        top 35px
        left 20px
    .menu-head-input
        position absolute
        top 15px
        left 70px
    .menu-head-output
        position absolute
        top 35px
        left 70px
    .menu-head-total
        position absolute
        top 15px
        right 45px
        font-size 20px
        color black
    .menu-head-icon
        position absolute
        top 20px
        font-size 20px
        right 15px
.menu-item
    padding-top 30px
    font-size 16px
    position relative
    background-color rgb(245, 245, 245)
    border-bottom 1px solid rgb(235, 235, 235)
    .menu-item-date
        position absolute
        top 5px
        left 15px
        font-size 14px
        color rgb(153, 178, 209)
    .menu-item-total
        position absolute
        top 5px
        right 15px
        font-size 14px
        color rgb(153, 178, 209)
    .menu-item-details
        height 40px
        padding 0 15px 0 25px
        box-sizing border-box
        font-size 18px
        line-height 40px
        .menu-item-details-type
            float left
        .menu-item-details-amount
            float right
</style>