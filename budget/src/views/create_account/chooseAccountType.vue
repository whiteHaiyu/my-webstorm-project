<template>
  <div>
      <van-nav-bar
        left-text="选择账户类型"
        left-arrow
        @click-left="$router.go(-1)"
        />
      <hidden-menu v-for="(item ,index) in accountList" :key="index" @func="getClick" :list="item"></hidden-menu>
  </div>
</template>

<script>
import hiddenMenu from "@/components/hiddenMenu.vue"
export default {
    name:"chooseAccountType",
    data:() => {
        return{
            accountList:[{
                classification:"测试111",
                details:[
                    {
                        name:'name1',
                        id:"id1"
                    },
                    {
                        name:'name2',
                        id:"id2"
                    },
                ]
            },
            {
                classification:"测试222",
                details:[
                    {
                        name:'name3',
                        id:"id3"
                    },
                    {
                        name:'name4',
                        id:"id4"
                    },
                ]
            },
            {
                classification:"测试333",
                details:[
                    {
                        name:'name5',
                        id:"id5"
                    },
                    {
                        name:'name6',
                        id:"id6"
                    },
                ]
            }]
        }
    },
    components:{
        hiddenMenu,
    },
    methods:{
        getClick(val){
            console.log(val)
            this.$router.push({
                path:"/addAccount",
                query:{
                    type:val
                }
            })
        }
    }
}
</script>

<style>

</style>