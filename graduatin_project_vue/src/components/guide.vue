<template>
    <div class="container">
      <ul class="tab">
        <li @click="jump2square"><img :src=square_url ></li>
        <li @click="jump2card"><img :src=card_url ></li>
        <li @click="jump2mine"><img :src=mine_url ></li>
      </ul>

      <keep-alive>
        <router-view/>
      </keep-alive>

    </div>
</template>

<script>
    export default {
        name: "guide",
      data(){
          return{
            square_url:'../../static/square.png',
            card_url:'../../static/card_active.png',
            mine_url:'../../static/mine.png',
          }
      },

      methods:{
        jump2square(){
          this.$router.replace('./square')
          this.square_url='../../static/square_active.png'
          this.card_url='../../static/card.png'
          this.mine_url='../../static/mine.png'
        },
        jump2card(){
          this.$router.replace('./card')
          this.square_url='../../static/square.png'
          this.card_url='../../static/card_active.png'
          this.mine_url='../../static/mine.png'
        },
        jump2mine(){
          this.$router.replace('./mine')
          this.square_url='../../static/square.png'
          this.card_url='../../static/card.png'
          this.mine_url='../../static/mine_active.png'
        }
      }
    }
</script>

<style scoped>
.tab{
  z-index: 100;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(179,179,179,0.13);
  height: 1rem;
  width: 7.5rem;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

li{
  line-height: 100%;
  text-align: center;
  list-style: none;
  flex-basis: 2rem;
}

  img{
    width: 0.5rem;
    height: 0.5rem;
    transform: translateY(-0.1rem);
  }

  p{
    font-size: 14px;
  }
</style>
