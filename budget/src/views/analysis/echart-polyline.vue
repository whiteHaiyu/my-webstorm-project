<template>
  <div>
    <div id="polyline-main" style="width: 375px;height:300px;"></div>
    <div class="details">
        <div class="details-item" style="background-color:#cccccc">
            <div>日期</div>
            <div>收入</div>
            <div>支出</div>
            <div>结余</div>
        </div>
        <div class="details-item" v-for="(item, index) in list" :key="index">
            <div>{{ item.date }}</div>
            <div>{{ item.input }}</div>
            <div>{{ item.output }}</div>
            <div>{{ item.remain }}</div>
        </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "poly",
  data() {
    return {
      list:[
          {
              date:'01-02',
              input:0,
              output:100,
              remain:200
          },
          {
              date:'01-04',
              input:0,
              output:100,
              remain:200
          },
          {
              date:'01-05',
              input:0,
              output:100,
              remain:200
          },
          {
              date:'01-08',
              input:0,
              output:100,
              remain:200
          },
          {
              date:'01-12',
              input:0,
              output:100,
              remain:200
          }
      ],
      option: {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          },
          {
            data: [420, 922, 901, 95, 1260, 130, 1320],
            type: "line"
          },
          {
            data: [820, 1332, 961, 94, 190, 1340, 1220],
            type: "line"
          }
        ]
      }
    };
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init( document.getElementById("polyline-main") );
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    }
  },
  mounted() {
    this.drawChart();
  }
};
</script>

<style lang="stylus" scoped>
.details
    padding 20px
    .details-item
        display flex
        justify-content space-between
        font-size 18px
        color black
        height 30px
        line-height 30px
        border-bottom 1px solid #999999
</style>
