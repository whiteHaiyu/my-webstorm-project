<template>
    <div class="container">
      <div class="table">

      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
      data(){
          return{

          }
      },

      methods:{
          login(){
            this.$router.push('/admin')
          }
      }
    }
</script>

<style scoped>

  .container{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-image: url("../assets/background.png");
    background-size:100% 100%;
  }

  .table{
    width: 450px;
    height: 300px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform:translate(-50%,-50%);
    background-color: rgba(255,255,255,0.35);
    border: 1px solid #FFF;
  }

</style>
