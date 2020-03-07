<template>
  <el-dialog :title="title" :visible.sync="dialogVisible" width="1000px">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" stretch>
      <el-tab-pane label="培训申请" name="trainingApply">
        <div class="moduleName">
          <i class="el-icon-edit"></i>培训申请
        </div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="组织单位:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="申请人:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="联系方式:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="培训类型:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="参加人数:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="培训时间:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <hr>

        <div class="moduleName" style="width:100%">
          <i class="el-icon-edit"></i>住宿信息
          <span style="float:right">{{form.name}}</span>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="房间类型:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="入住人数:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="入住时间:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <hr>

        <div class="moduleName">
          <i class="el-icon-edit"></i>培训信息
          <span style="float:right">{{form.name}}</span>
        </div>
        <el-form ref="form" :model="form" label-width="110px">
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="会议室数量:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="讲师人数:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否制作桌牌:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="是否短信通知:">
                <el-input v-model="form.name" disabled></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <hr>

      </el-tab-pane>

      <el-tab-pane label="培训费用" name="trainingCost">培训费用</el-tab-pane>
      <el-tab-pane label="培训人员" name="trainingList">培训人员</el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <div style="text-align:center">
        <div style="margin-bottom:30px">
          <el-checkbox v-model="checked">是否加入日程</el-checkbox>
          <span>{{ form.name }}</span>
        </div>
        <el-button type="primary" @click="dialogVisible = false">通过</el-button>
        <el-button type="danger" @click="dialogVisible = false">拒绝</el-button>
      </div>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "trainingAdd",

  data() {
    return {
      title: "新员工培训申请",
      dialogVisible: true,
      activeName: "trainingApply",
      checked: true,
      form: {
        name: "请输入内容"
      }
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style scoped>
.moduleName {
  color: rgb(83, 159, 247);
  font-size: 18px;
  font-weight: 450;
  margin-bottom: 20px;
}
.moduleName span {
  color: gray;
  font-size: 12px;
  font-weight: lighter;
}

hr{
    border: none;
    height: 1px;
    margin-bottom: 20px;
    background-color: gainsboro;
}
</style>