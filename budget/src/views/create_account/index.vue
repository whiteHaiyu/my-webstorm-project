<template>
  <div>
      <van-nav-bar
        left-text="添加账户"
        left-arrow
        @click-left="$router.replace('/account')"
        />
        <van-field clickable v-model="name" label="账户名称" placeholder="输入账户名称" input-align="right"/>
        <van-field clickable v-model="balance" label="账户余额" placeholder="输入账户余额" input-align="right"/>
        <van-field readonly clickable v-model="type" label="账户类型" placeholder="点击选择账户类型" input-align="right" right-icon="arrow" @click="$router.push('/chooseAccountType')"/>
        <van-field clickable v-model="note" label="备注" placeholder="备注" input-align="right"/>

        <div style="margin: 26px ;text-align:center">
            <van-button size="small" round color="#E58B37" style="margin:20px; width:100px;" @click="sureBtn">确定</van-button>
    </div>
  </div>
</template>

<script>
export default {
    name:"createAccount",
    data(){
        return{
            name:"",
            balance:"",
            note:"",
            type:"",
        }
    },
    created(){
        if(this.$route.query.type){
            this.type = this.$route.query.type
        }
    },
    methods:{
        sureBtn(){
            this.$router.replace('/account')
        }
    }
}
</script>

<style>

</style>
