<!--首页展示，done-->
<template>
    <div class="container">
      <div class="data_list">
        <div class="data">
          <p class="data_item">用户数目</p>
          <p class="data_detail">{{user_count | NumFormat}}</p>
        </div>
        <div class="data">
          <p class="data_item">车辆数目</p>
          <p class="data_detail">{{car_count | NumFormat}}</p>
        </div>
        <div class="data">
          <p class="data_item">今日用车流量</p>
          <p class="data_detail">{{flow | NumFormat}}</p>
        </div>
        <div class="data">
          <p class="data_item">今日访问数</p>
          <p class="data_detail">{{visit | NumFormat}}</p>
        </div>

        <div class="chart">
          <div id="myChart"  :style="{width: '100%', height: '500px'}"></div>
        </div>
      </div>



    </div>
</template>

<script>
    export default {
        name: "home",
      data(){
          return{
            user_count:0,
            car_count:0,
            visit:0,
            flow:0,
            postData:{
              username:'',
              token:'',
              timestamp:''
            },
          }
      },

      filters: {
        NumFormat: function (value) {
          let intPart = Number(value).toFixed(0) // 获取整数部分
          let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
          return intPartFormat
        }
      },

      mounted() {
        this.initInfo()
        this.drawLine()
      },

      methods: {

        initInfo(){
          this.postData.username = this.$store.state.username
          this.postData.token = this.$store.state.token
          this.postData.timestamp = new Date().getTime()
          let sign = this.$md5(this.util.sortData(this.postData))
          let url='https://bms.gamewan.top/api/getindexinfo'
          let data=this.util.getString(this.postData)+'&sign='+sign
          this.$axios.post(url,data).then(res => {
            console.log(res)
            if(res.data.code == 1000) {
              this.user_count = res.data.indexInfo.userCount
              this.car_count = res.data.indexInfo.carCount
              this.visit = res.data.indexInfo.todayUserCarCount
              this.flow = res.data.indexInfo.todaywelcomeCount
            }else{
              this.$message({
                message: '服务器挂了，稍后再试~',
                type: 'warning'
              })
            }
          }).catch(err => {
            console.log(err)
          })
        },

        drawLine(){
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data:['expected','actual']
            },
            grid:{
              left:'10%',
              top:'15%',
              right:'10%',
              bottom:'10%'
            },
            series: [
              {
                name:'expected',
                data: [820, 932, 901, 934, 1690, 830, 1120],
                type: 'line',
                smooth: true
              },
              {
                name:'actual',
                data: [620, 532, 901, 1290, 1330, 1320, 820],
                type: 'line',
                smooth: true
              }
            ]
          })

          window.onresize = myChart.resize
        }
      }
    }
</script>

<style scoped>

  .container{
    width: 100%;
    height: 100%;
    background-color: rgb(240, 242, 245);
    position: relative;
  }

  .data_list{
    width: 80%;
    position: absolute;
    top: 50px;
    left: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .data{
    background-color: #fff;
    flex-basis: 300px;
    height: 120px;
    position: relative;
  }

  .chart{
    position: absolute;
    width: 100%;
    top: 180px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 2;
  }

  .data_item{
    font-size: 18px;
    color: rgb(107, 107, 107);
    position: absolute;
    right: 30px;
    top: 40px;
  }
  .data_detail{
    font-weight: bolder;
    font-size: 20px;
    position: absolute;
    right: 30px;
    top: 75px;
  }

</style>
