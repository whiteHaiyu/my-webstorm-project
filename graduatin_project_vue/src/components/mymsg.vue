<template>
    <div>
      <img src="../assets/mine_bg.png" class="background">

      <p class="title">留言板</p>
      <p class="detail">超级医疗信息分享系统欢迎您！</p>

      <div class="container">
        <ul>
          <li>
            <img src="" alt="">
          </li>
        </ul>
      </div>

    </div>
</template>

<script>
    export default {
        name: "mymsg",
      data(){
          return{

          }
      }
    }
</script>

<style scoped>

  .background{
    width: 7.5rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .title{
    position: absolute;
    top: 2rem;
    left: 0.4rem;
    font-size: 32px;
    color: white;
  }
  .detail{
    position: absolute;
    top: 2.8rem;
    left: 0.4rem;
    font-size: 16px;
    color: white;
  }
</style>
