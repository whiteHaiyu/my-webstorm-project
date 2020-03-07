<template>
  <div>
      <div class="menu-title" @click="showDetails = !showDetails">{{ list.classification }}<van-icon style="float:right;line-height:50px;" v-show="list.details" :name="showDetails ? 'arrow-down':'arrow'" /></div>
      <div class="menu-items" @click="getId(item.id)" v-show="showDetails" v-for="(item, index) in list.details" :key="index">{{ item.name }}</div>
  </div>
</template>

<script>
export default {
    name:"hiddenMenu",
    data:() => {
        return{
            showDetails: false
        }
    },
    props:["list"],
    methods:{
        getId(value){
            this.$emit('func',value)
        }
    }
}
</script>

<style scoped>
.menu-title{
    height: 50px;
    font-size: 16px;
    line-height: 50px;
    border-top: 1px solid #F5F5F5;
    border-bottom: 1px solid #F5F5F5;
    padding: 0 25px;
}
.menu-items{
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    padding-left: 40px;
}

</style>