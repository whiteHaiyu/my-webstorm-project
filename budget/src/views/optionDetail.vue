<template>
  <div>
       <van-nav-bar
        left-text="详情"
        left-arrow
        @click-left="$router.go(-1)">
        <template #right>
            <van-icon name="delete" />
        </template>
       </van-nav-bar>

       <div class="details-card">
           <div class="details-card-total">
               <div class="details-card-total-name">{{content.name}}</div>
               <div class="details-card-total-total">{{content.total}}</div>
               <div class="details-card-total-before">变更前：{{content.before}}</div>
               <div class="details-card-total-after">变更后：{{content.after}}</div>
           </div>
           <div class="details-card-list">
               <div><span style="float:left">记账时间</span>{{content.time}}</div>
               <div><span style="float:left">资金账户</span>{{content.account}}</div>
               <div><span style="float:left">账本名称</span>{{content.budget}}</div>
               <div><span style="float:left">记账成员</span>{{content.member}}</div>
           </div>
           <div class="details-card-modify">编辑</div>
       </div>
  </div>
</template>

<script>
export default {
    name:"optionDetail",
    data(){
        return{
            content:{
                name:'购物',
                total:'1',
                before:'12311',
                after:'1',
                time:'2020-01-02',
                account:'招商银行',
                budget:"日常生活",
                member:"我"
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.details-card
    width 80%
    margin 35px auto
    box-shadow 0 0 3px #cccccc
    border-radius 5px
    font-size 16px
    padding 15px
    box-sizing border-box
    position relative
    .details-card-total
        position relative
        height 80px
        border-bottom 1px dashed #999
        .details-card-total-name
            position absolute
            top 0
            left 0
            font-size 20px
        .details-card-total-total
            position absolute
            top 0
            right 0
            font-size 20px
        .details-card-total-before
            position absolute
            top 40px
            left 0
        .details-card-total-after
            position absolute
            top 40px
            right 0
    .details-card-list
        text-align right
        font-size 14px
        color #aaaaaa
        >div
            margin 12px 0
    .details-card-modify
        font-size 18px
        color #ffffff
        width 60%
        height 40px
        line-height 40px
        border-radius 20px
        background-color rgb(229, 139, 55)
        text-align center
        position absolute
        bottom -20px
        left 20%

        
</style>