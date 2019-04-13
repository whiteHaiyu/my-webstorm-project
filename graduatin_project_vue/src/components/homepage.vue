<!--登录后展示主页，瀑布流展示当前用户存储的病历信息-->
<!--功能跳转->注销用户、新建病历、病历删除-->


<template>
    <div>
      <p>欢迎您！{{this.$store.state.loginState}}</p>
<!--      <p>{{this.$router.params.user}}</p>-->
      <input type="button" value="注销" @click="cancel">

      <ul>
        <li v-for="(items,index) in showData" :key="index" @click="showDetails(index)">
          <p>{{items.clinic_time}}</p>
          <p>名字：{{items.name}}</p>
          <p>主诉：{{items.main_suit}}</p>
          <p>体征：{{items.examine}}</p>
          <p>诊断：{{items.diagnose}}</p>

          <input type="button" value="删除" @click.stop="del(index)">
        </li>
      </ul>

      <input type="button" value="添加" @click="add">
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'

    export default {
        name: "homepage",
      data(){
          return{
            showData:{
              user:'',
              id:'',
              clinic_time:'',
              clinic_place:'',
              name:'',
              sex:'',
              birth:'',
              nation:'',
              marry:'',
              job:'',
              work_unit:'',
              address:'',
              allergy_history:'',
              division:'',
              main_suit:'',
              present_illness:'',
              history_illness:'',
              examine:'',
              diagnose:'',
              cure:'',
              advice:'',
              doctor:''
            },

          }
      },

      mounted(){
        this.askinfo()
      },

      methods:{

          // 请求用户记录信息
        askinfo(){
          this.$axios({
            method:'post',
            url:'http://localhost:3000/getinfo',
            data:{
              user:this.$store.state.loginState
            }
          }).then(res => {
            // console.log(res)
            this.showData=res.data
            console.log(this.showData)
          }).catch(err => {
            console.log(err)
          })
        },

        // 删除当前病历
        del(index){
          console.log(index)
          this.$axios({
            method: 'post',
            url: 'http://localhost:3000/delete',
            data:{
              id:this.showData[index].id
            }
          }).then(res => {
            if(res.data == 'delete success'){
              Toast({
                message: '删除成功',
                duration: 1000
              })
              this.askinfo()
            }else{
              Toast({
                message:'删除失败，请重试',
                duration:1000
              })
            }
          }).catch(err => {
            console.log(err)
          })
        },

        showDetails(e){
          console.log(e)
          this.$store.commit('getIndex',e)
          this.$router.push('/detail')
        },

        // 用户登录注销
        cancel(){
          this.$store.commit('change','')
          this.$router.push('/')
          Toast({
            message:'感谢使用医疗信息记录系统',
            duration:1000
          })
        },

        // 跳转到创建病历页面
        add(){
            this.$router.push('/create')
        }
      }
    }
</script>

<style scoped>

</style>
