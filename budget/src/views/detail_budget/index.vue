<template>
  <div>
      <van-nav-bar
        left-text="账本名称"
        left-arrow
        @click-left="$router.go(-1)"
        />

        <div class="accountdetail-card">
            <div class="accountdetail-card-accountBalance">{{ myFlowing.accountBalance }}</div>
            <div class="accountdetail-card-accountBalance-text">预算额度</div>
            <div class="accountdetail-card-input">{{ myFlowing.totalInput }}</div>
            <div class="accountdetail-card-input-text">上账期转结</div>
            <div class="accountdetail-card-output">{{ myFlowing.totalOutput }}</div>
            <div class="accountdetail-card-output-text">本账期已用</div>
        </div>

        <hiddenAccountDetail v-for="(item, index) in myFlowing.detailList" :key="index" :list="item" ></hiddenAccountDetail>
  </div>
</template>

<script>
import hiddenAccountDetail from "@/components/hiddenAccountDetail"

export default {
    name:"budgetDetail",
    data:() => {
        return{
            myFlowing:{
                accountBalance:'11111',
                totalInput:'22222',
                totalOutput:'11111',
                detailList:[
                    {
                        date:'2019-11',
                        input:'111',
                        output:'333',
                        details:[
                            {
                                date:'2019-11-01',
                                total:'-1230',
                                dailyDetail:[
                                    {
                                        type:'购物',
                                        amount:'-320'
                                    },
                                    {
                                        type:'充值',
                                        amount:'-910'
                                    }
                                ]
                            },
                            {
                                date:'2019-11-11',
                                total:'230',
                                dailyDetail:[
                                    {
                                        type:'分红',
                                        amount:'230'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        date:'2019-12',
                        input:'121',
                        output:'323',
                        details:[
                            {
                                date:'2019-12-01',
                                total:'-1230',
                                dailyDetail:[
                                    {
                                        type:'购物',
                                        amount:'-320'
                                    },
                                    {
                                        type:'充值',
                                        amount:'-910'
                                    }
                                ]
                            },
                            {
                                date:'2019-12-11',
                                total:'230',
                                dailyDetail:[
                                    {
                                        type:'分红',
                                        amount:'230'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    },
    components:{
        hiddenAccountDetail
    },
    methods:{

    }
}
</script>

<style lang="stylus" scoped>
.accountdetail-card
    width 90%
    margin 0 auto
    height 140px
    border-radius 7px
    background-color rgb(206, 214, 229)
    color white
    text-align center
    position relative
    font-size 14px
    .accountdetail-card-accountBalance
        font-size 20px
        position absolute
        width 100%
        top 20px
        left 0
    .accountdetail-card-accountBalance-text
        position absolute
        width 80%
        top 55px
        left 10%
        padding-bottom 10px
        border-bottom 1px solid white
    .accountdetail-card-input
        position absolute
        font-size 20px
        width 50%
        left 0
        top 90px
    .accountdetail-card-input-text
        position absolute
        width 50%
        left 0
        top 115px
    .accountdetail-card-output
        position absolute
        font-size 20px
        width 50%
        right 0
        top 90px
    .accountdetail-card-output-text
        position absolute
        width 50%
        right 0
        top 115px

</style>
