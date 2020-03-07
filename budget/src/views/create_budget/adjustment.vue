<template>
  <div class="container">
    <div class="budget_input">
        <input class="budget_input_text" type="number" placeholder="0" style="border-style:none" v-model="money">￥
    </div>
    <div class="budget_detail">
        <div class="budget_detail_item" @click="budgetPicker = true"><div class="budget_detail_item_head"><van-icon name="records" /> 账本</div>{{ budget | transEmpty }}</div>
        <div class="budget_detail_item" @click="kindPicker = true"><div class="budget_detail_item_head"><van-icon name="shopping-cart-o" />  分类</div>{{ kind | transCascade}}</div>
        <div class="budget_detail_item" @click="timePicker = true"><div class="budget_detail_item_head"><van-icon name="underway-o" />  时间</div>{{ time | timeFilter }}</div>
    </div>

    <van-popup v-model="budgetPicker" position="bottom">
        <van-picker show-toolbar title="选择账本" :columns="budgetList" @cancel="budgetPicker = false" @confirm="budgetConfirm" />
    </van-popup>

    <van-popup v-model="kindPicker" position="bottom">
        <van-picker show-toolbar title="选择分类" :columns="kindList" @cancel="kindPicker = false" @confirm="kindConfirm" />
    </van-popup>

    <van-popup v-model="timePicker" position="bottom">
        <van-datetime-picker  v-model="time" type="datetime" @cancel="timePicker = false" @confirm="timeConfirm" />
    </van-popup>
  </div>
</template>

<script>
export default {
    name:'budget_adjustment',
    data: () => {
        return{
            money: '',/* 金额输入 */
            budget: '',/* 账本选择 */
            kind: [],/* 分类选择 */
            time: new Date(),/* 时间选择 */

            // 账本选择相关
            budgetPicker: false,
            budgetList: ["测试账本1", "测试账本2"],

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

            // 时间选择相关
            timePicker: false,

        }
    },

    methods:{
        saveData(){
            let data = {
                money:this.money,
                budget:this.budget,
                kind:this.kind,
                time:this.time
            }
            console.log(data)
        },

        budgetConfirm(value){
            this.budget = value
            this.budgetPicker = false
        },

        kindConfirm(value){
            this.kind = value
            this.kindPicker = false
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
