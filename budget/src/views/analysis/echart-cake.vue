<template>
  <div>
    <div id="cake-main" style="width: 375px;height:300px;"></div>
    <div class="details">
        <div class="details-item" v-for="(item, index) in list" :key="index">
            <div>{{ item.type }}</div>
            <div>{{ item.precent }}</div>
            <div>{{ item.value }}</div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cake",
  data() {
    return {
      list:[
          {
              type:"购物",
              value:200,
              precent:'33%'
          },
          {
              type:"餐饮",
              value:200,
              precent:'33%'
          },
          {
              type:"出行",
              value:200,
              precent:'33%'
          }
      ],
      option: {
        legend: {
          orient: "vertical",
          left: "left",
          data: ["购物", "餐饮", "出行"]
        },
        series: [
          {
            name: "支出情况",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: 200, name: "购物" },
              { value: 200, name: "餐饮" },
              { value: 200, name: "出行" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  methods: {
    drawChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("cake-main"));
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
        height 50px
        line-height 50px
        border-bottom 1px solid #999999
</style>