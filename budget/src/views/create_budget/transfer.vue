<template>
  <div class="container">
    <div class="budget_input">
        <input class="budget_input_text" type="number" placeholder="0" style="border-style:none" v-model="money">￥
    </div>
    <div class="budget_detail">
        <div class="budget_detail_item"><div class="budget_detail_item_head"><van-icon name="balance-pay" /> 账户</div><span @click="chooseAccount(1)">{{ accountFrom[1] | transCascade }}</span> <van-icon name="exchange" /> <span @click="chooseAccount(2)">{{ accountTo[1] | transCascade }}</span></div>
        <div class="budget_detail_item" @click="timePicker = true"><div class="budget_detail_item_head"><van-icon name="underway-o" /> 时间</div>{{ time | timeFilter }}</div>
    </div>

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
    name:'budget_transfer',
    data: () => {
        return{
            money: '',/* 金额输入 */
            kind: [],/* 分类选择 */
            accountFrom: [],/* 账户选择 */
            accountTo: [],/* 账户选择 */
            time: new Date(),/* 时间选择 */

            activeInput:'',

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
                kind:this.kind,
                accountFrom:this.accountFrom,
                accountTo:this.accountTo,
                time:this.time
            }
            console.log(data)
        },

        chooseAccount(active){
            this.accountPicker = true
            this.activeInput = active
        },

        accountConfirm(value){
            if(this.activeInput == 1){
                this.accountFrom = value
            }else{
                this.accountTo = value
            }
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
