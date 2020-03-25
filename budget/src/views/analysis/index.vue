<template>
  <div>
      <van-nav-bar
        left-text="统计报表"
        left-arrow
        @click-left="$router.go(-1)"
    />
    <div class="analysis-time-container">
        <div class="analysis-time-container-left" @click="showPicker = true"><van-icon name="filter-o" />{{ year }}</div>
        <div class="analysis-time-container-right" @click="show = true"><van-icon name="descending" />筛选</div>
        <div class="time-bar">
            <van-tabs>
                <van-tab v-for="index in 12" :key="index" :title="index + '月'"></van-tab>
            </van-tabs>
        </div>
    </div>
    <div class="analysis-total">
        <div class="analysis-total-item">
            <div style="font-size:20px">{{total.output}}</div>
            <div>总支出</div>
        </div>
        <div class="analysis-total-item">
            <div style="font-size:20px">{{total.input}}</div>
            <div>总收入</div>
        </div>
        <div class="analysis-total-item">
            <div style="font-size:20px">{{total.remain}}</div>
            <div>总结余</div>
        </div>
    </div>

    <div class="analysis-board">
        <div class="board-btns">
            <div class="board-btns-l" :class="active == 'l' ? 'board-btns-active':''" @click="active = 'l'">饼图</div>
            <div class="board-btns-r" :class="active == 'r' ? 'board-btns-active':''" @click="active = 'r'">折线图</div>
        </div>

        <echart-polyline v-if="active == 'r'"></echart-polyline>
        <echart-cake v-else></echart-cake>
    </div>

    <van-popup v-model="showPicker" position="bottom">
        <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
    </van-popup>

    <van-popup
        v-model="show"
        position="right"
        class="popup"
    >
        <div class="select">
            <div class="select-title">筛选账本<span style="float:right; margin-right:15px; color:#E58B37">取消</span></div>
            <div class="select-items" v-for="(item, index) in ledgers" :key="index">
                {{ item }}
            </div>
        </div>
        <div class="select">
            <div class="select-title">筛选成员<span style="float:right; margin-right:15px; color:#E58B37">全选</span></div>
            <div class="select-items" v-for="(item, index) in users" :key="index">
                {{ item }}
            </div>
        </div>
        <div class="select">
            <div class="select-title">筛选账户<span style="float:right; margin-right:15px; color:#E58B37">全选</span></div>
            <div class="select-items" v-for="(item, index) in accounts" :key="index">
                {{ item }}
            </div>
        </div>
        <div class="select-sure">确定</div>
        <div class="select-reset">取消</div>
    </van-popup>
    

  </div>
</template>

<script>
import echartCake from './echart-cake'
import echartPolyline from './echart-polyline'
export default {
    name:"analysis",
    components:{
        echartCake,echartPolyline
    },
    data(){
        return{
            ledgers:['我的账本','你的账本','我的账本','你的账本'],
            users:['你','我'],
            accounts:['支付宝','中国人民银行','建设银行'],
            columns:['2019', '2020'],
            showPicker:false,
            show:false,
            year:'2020',
            active:'l',
            total:{
                input:"11111",
                output:'1111',
                remain:'10000'
            }
        }
    },

    methods:{
        onConfirm(value){
            // console.log(value)
            this.year = value
            this.showPicker = false
        }
    }
}
</script>

<style lang="stylus" scoped>
.analysis-time-container
    position relative
    border-bottom 1px solid #eeeeee
    .time-bar
        margin 0 60px
    .analysis-time-container-left
        position absolute
        top 7px
        left 0
        font-size 14px
        border-right 1px solid #bbbbbb
        padding 5px
    .analysis-time-container-right
        position absolute
        top 7px
        right 0
        font-size 14px
        border-left 1px solid #bbbbbb
        padding 5px
.analysis-total
    font-size 14px
    display flex
    justify-content space-around
    align-items center
    padding 10px 0
    border-bottom 1px solid #eeeeee
    .analysis-total-item
        flex-grow 1
        text-align center
.analysis-board
    padding 10px
    color #999999
    .board-btns
        font-size 16px
        width 140px
        height 28px
        margin 0 auto
        display flex
        justify-content space-around
        align-items center
        box-shadow 0 0 2px #999999
        border-radius 28px
        .board-btns-l
            border-bottom-left-radius 28px
            border-top-left-radius 28px
            height 28px
            line-height 28px
            width 70px
            text-align center
        .board-btns-r
            border-bottom-right-radius 28px
            border-top-right-radius 28px
            border-right none 
            height 28px
            line-height 28px
            width 70px
            text-align center
        .board-btns-active
            border 1px solid #E58B37
            color #E58B37
.popup
    height 100vh
    width 70%
    .select
        margin-top 20px
        padding 5px
        display flex
        flex-wrap wrap
        font-size 16px
        width 100%
        .select-title
            width 100%
            box-sizing border-box
            margin-bottom 15px
            padding-bottom 15px
            border-bottom 1px solid #cccccc
        .select-items
            width 70px
            margin 5px
            // border 1px solid #E58B37
            background-color rgb(243, 243, 243)
            font-size 14px
            height 25px
            line-height 25px
            text-align center
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        .select-items-active
            border 1px solid #E58B37
            background none
    .select-sure
        width 50%
        height 50px
        position absolute
        left 0
        bottom 0
        font-size 18px
        line-height 50px
        text-align center
        border-top 1px solid #cccccc
        border-right 1px solid #cccccc
    .select-reset
        width 50%
        height 50px
        position absolute
        right 0
        bottom 0
        font-size 18px
        line-height 50px
        text-align center
        border-top 1px solid #cccccc
        border-left 1px solid #cccccc

</style>