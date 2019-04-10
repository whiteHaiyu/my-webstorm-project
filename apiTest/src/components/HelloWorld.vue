<template>
    <div>
      <input type="text" v-model="user">
      <input type="text" v-model="pwd">
      <input type="button" @click="login">
    </div>
</template>

<script>

export default{
  data() {
    return{
      user:'',
      pwd:'',
    }
  },

  methods:{
    login(){
      console.log('do axios')
      this.$axios({
        method:'post',
        url:'http://localhost:3000/login',
        data:{
          user:this.user,
          pwd:this.pwd
        }
      }).then(res=>{
        console.log(res)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
