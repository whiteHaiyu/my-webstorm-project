<template>
  <div class="container">
    <div class="budget_input">
        <input class="budget_input_text" type="number" placeholder="0" style="border-style:none" v-model="money">￥
    </div>
    <div class="budget_detail">
        <div class="budget_detail_item" @click="kindPicker = true"><div class="budget_detail_item_head"><van-icon name="shopping-cart-o" /> 分类</div>{{ kind | transCascade}}</div>
        <div class="budget_detail_item" @click="accountPicker = true"><div class="budget_detail_item_head"><van-icon name="balance-pay" /> 账户</div>{{ account | transCascade }}</div>
        <div class="budget_detail_item" @click="timePicker = true"><div class="budget_detail_item_head"><van-icon name="underway-o" /> 时间</div>{{ time | timeFilter }}</div>
    </div>

    <van-popup v-model="kindPicker" position="bottom">
        <van-picker show-toolbar title="选择分类" :columns="kindList" @cancel="kindPicker = false" @confirm="kindConfirm" />
    </van-popup>

    <van-popup v-model="accountPicker" position="bottom">
        <van-picker show-toolbar title="选择账户" :columns="accountList" @cancel="accountPicker = false" @confirm="accountConfirm" />
    </van-popup>

    <van-popup v-model="timePicker" position="bottom">
        <van-datetime-picker  v-model="time" type="datetime" @cancel="timePicker = false" @confirm="timeConfirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
    name:'budget_input',
    data: () => {
        return{
            money: '',/* 金额输入 */
            kind: [],/* 分类选择 */
            account: [],/* 账户选择 */
            time: new Date(),/* 时间选择 */

            // 分类选择相关
            kindPicker: false,
            kindList:[
                {
                    text:"线下消费",
                    children:[{text:"饮料酒水"},{text:"柴米油盐"}]
                },
                {
                    text:"线上消费",
                    children:[{text:"美团外卖"},{text:"京东淘宝"}]
                }
            ],

            // 账户选择相关
            accountPicker: false,
            accountList:[
                {
                    text:"在线支付",
                    children:[{text:"支付宝"},{text:"微信支付"}]
                },
                {
                    text:"储蓄卡",
                    children:[{text:"招商银行"},{text:"光大银行"}]
                }
            ],

            // 时间选择相关
            timePicker: false,

        }
    },

    methods:{
        saveData(){
            let data = {
                money:this.money,
                account:this.account,
                kind:this.kind,
                time:this.time
            }
            console.log(data)
        },

        kindConfirm(value){
            this.kind = value
            this.kindPicker = false
        },

        accountConfirm(value){
            this.account = value
            this.accountPicker = false
        },

        timeConfirm(value){
            this.time = value
            this.timePicker = false
        }
    }
}
</script>

<style lang="stylus" scoped>
@import "../../styles/budget_create.stylus"
</style>
