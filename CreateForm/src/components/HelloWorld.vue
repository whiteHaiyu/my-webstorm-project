<template>
<!--  <fm-making-form-->
<!--    ref="makingform"-->
<!--    style="height: 500px;"-->
<!--  >-->
<!--    <template slot="action">-->
<!--      &lt;!&ndash; 自定义操作区域插槽 &ndash;&gt;-->
<!--      <el-button type="text" icon="el-icon-upload" @click="geter">保存</el-button>-->
<!--    </template>-->
<!--  </fm-making-form>-->
  <div>
    <fm-generate-form
      :data="jsonData"
      ref="generateForm"
    >
    </fm-generate-form>
    <el-button @click="getInfo">获取内容</el-button>
  </div>


</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      jsonData: {
        "list": [
          // {
          //   "type": "input",
          //   "name": "单行文本",
          //   "icon": "icon-input",
          //   "options": {
          //     "width": "100%",
          //     "defaultValue": "",
          //     "required": false,
          //     "dataType": "string",
          //     "pattern": "",
          //     "placeholder": "",
          //     "remoteFunc": "func_1540908864000_94322"
          //   },
          //   "key": "1540908864000_94322",
          //   "model": "input_1540908864000_94322",
          //   "rules": [
          //     {
          //       "type": "string",
          //       "message": "单行文本格式不正确"
          //     }
          //   ]
          // }
        ],
        "config": {
          "labelWidth": 100,
          "labelPosition": "top",
          "size": "small"
        }
      }
    }
  },
  mounted(){
    this.axios.get('http://localhost:3001/apiTest').then(res => {
      // console.log(res.data)
      this.jsonData.list.push(res.data)
      console.log(this.jsonData)
    }).catch(err => {
      console.log(err)
    })
  },
  methods:{
    getInfo(){
      console.log(this.$refs.generateForm.getData())
    },
    geter() {
      console.log(this.$refs.makingform.getJSON().list)
      let postData = this.$refs.makingform.getJSON().list
      this.axios({
        method: 'post',
        url: 'http://localhost:3001/apiTest2',
        data: postData
      }).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
