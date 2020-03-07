<template>
  <div>
      <van-nav-bar
        title="记一笔"
        left-text="返回"
        right-text="保存"
        left-arrow
        @click-left="$router.go(-1)"
        @click-right="saveForm"
        />

        <van-tabs v-model="active">
            <van-tab title="支出">
                <budget-output ref="output"></budget-output>
            </van-tab>
            <van-tab title="收入">
                <budget-input ref="input"></budget-input>
            </van-tab>
            <van-tab title="转账">
                <budget-transfer ref="transfer"></budget-transfer>
            </van-tab>
            <van-tab title="调整预算">
                <budget-adjustment ref="adjustment"></budget-adjustment>
            </van-tab>
        </van-tabs>
  </div>
</template>

<script>
import budgetAdjustment from './adjustment'
import budgetInput from './input'
import budgetOutput from './output'
import budgetTransfer from './transfer'
export default {
    name:'create_budget',
    data:() => {
        return{
            active:0
        }
    },
    components:{
        budgetAdjustment,
        budgetInput,
        budgetOutput,
        budgetTransfer
    },
    created(){
        this.changeActive()
    },
    methods:{
        changeActive(){
            if(this.$route.query.target){
                this.active = this.$route.query.target
            }
        },

        saveForm(){
            switch(this.active){
                case 0:
                    this.$refs.output.saveData()
                    break
                case 1:
                    this.$refs.input.saveData()
                    break
                case 2:
                    this.$refs.transfer.saveData()
                    break
                case 3:
                    this.$refs.adjustment.saveData()
                    break
                default:
                    break
            }
        }
    }
}
</script>

<style>

</style>