<template>
  <div>
      <van-nav-bar
        left-text="添加/编辑个人账本"
        left-arrow
        @click-left="$router.go(-1)"
    />

    <van-field readonly clickable  v-model="formData.scenes" label="记账场景" placeholder="点击选择场景" @click="scenesPicker = true" input-align="right" right-icon="arrow"/>
    <van-popup v-model="scenesPicker" position="bottom">
        <van-picker show-toolbar title="选择场景" :columns="scenesList" @cancel="scenesPicker = false" @confirm="scenesConfirm" />
    </van-popup>

    <van-field clickable v-model="formData.name" label="账本名称" placeholder="请输入5字以内名称" input-align="right"/>

    <van-field clickable v-model="formData.budget" label="设置预算" type="number" placeholder="请输入金额￥" input-align="right"/>

    <van-field readonly clickable v-model="formData.startTime" label="开始日期" placeholder="点击选择日期" input-align="right" right-icon="arrow" @click="startTimeCalendar = true"/>
    <van-calendar v-model="startTimeCalendar" @confirm="startTimeConfirm" />

    <van-field name="radio" label="是否重复" input-align="right">
        <template #input>
            <van-radio-group v-model="formData.repeat" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
            </van-radio-group>
        </template>
    </van-field>

    <van-field readonly clickable v-show="formData.repeat == 0" v-model="formData.endTime" label="结束日期" placeholder="点击选择日期" input-align="right" right-icon="arrow" @click="endTimeCalendar = true"/>
    <van-calendar v-model="endTimeCalendar" @confirm="endTimeConfirm" />

    <van-field v-show="formData.repeat == 1" readonly clickable v-model="formData.frequency" label="频率" placeholder="请选择" @click="frequencyPicker = true" input-align="right"/>
    <van-popup v-model="frequencyPicker" position="bottom">
        <van-picker show-toolbar title="选择频率" :columns="frequencyList" @cancel="frequencyPicker = false" @confirm="frequencyConfirm" />
    </van-popup>

    <van-field v-show="formData.repeat == 1" name="radio" label="是否转结" input-align="right">
        <template #input>
            <van-radio-group v-model="formData.carryOver" direction="horizontal">
                <van-radio name="1">是</van-radio>
                <van-radio name="0">否</van-radio>
            </van-radio-group>
        </template>
    </van-field>

    <van-field readonly clickable label="添加子预算" type="number" input-align="right" right-icon="plus" @click="addChild = true"/>

    <div class="childBudget" v-for="(item,index) in childBudgetList" :key="index">
        <div class="childBudget_name">{{item.name}}</div>
        <div class="childBudget_budget">{{item.budget | moneyCompletion}}</div>
        <div class="childBudget_delete" @click="removeChild(index)">删除</div>
    </div>
        
    <van-dialog v-model="addChild" title="设置子预算" show-cancel-button @confirm="addChildConfirm" @cancel="addChildCancel">
        <van-field clickable v-model="childData.name" label="子预算名称" placeholder="请输入5字以内名称" input-align="right"/>
        <van-field readonly clickable v-model="childData.type" label="子预算类型" placeholder="请选择" input-align="right"/>
        <van-field clickable v-model="childData.budget" label="子预算金额" placeholder="请输入金额￥" type="number" input-align="right"/>
    </van-dialog>

    <van-field clickable v-model="invitationCode" v-show="formData.scenes == '共享账本'" label="我的邀请码" readonly input-align="right"/>


    <div style="margin: 26px ;text-align:center">
        <van-button size="small" round color="#E58B37" style="margin:20px; width:100px;" @click="$router.go(-1)">删除</van-button>
        <van-button size="small" round color="#344D99" style="margin:20px; width:100px;" @click="saveForm">保存</van-button>
    </div>

  </div>
</template>

<script>
export default {
    name:'create_ledger',
    data: () => {
        return{
            formData:{
                scenes:'',
                name:'',
                budget:'',
                startTime:'',
                endTime:'',
                repeat:'0',
                frequency:'',
                carryOver:'0',
            },

            // 我的邀请码
            invitationCode:"",

            scenesPicker: false,
            scenesList:["个人账本","共享账本"],

            frequencyPicker: false,
            frequencyList:["1月","3月","6月","12月"],

            startTimeCalendar: false,
            endTimeCalendar: false,

            childData:{
                name:"",
                type:"",
                budget:""
            },
            addChild:false,
            childBudgetList:[]
        }
    },
    created(){
        this.invitationCode = this.createCode()
        this.formData.scenes = this.$route.params.type == 'personal' ? '个人账本' : '共享账本'
    },
    methods:{
        removeChild(idx){
            this.childBudgetList = this.childBudgetList.filter((ele, index) =>  index != idx)
            console.log(this.childBudgetList)
        },

        saveForm(){
            console.log(this.formData)
        },

        // 生成邀请码
        createCode(){
            return 'xxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
                return v.toString(16).toUpperCase();
            });
        },

        addChildConfirm(){
            console.log(this.childData)
            if(this.childData.name != "" && this.childData.budget != ""){
                let temp = Object.assign({},this.childData)
                this.childBudgetList.push(temp)
            }else{
                this.$toast("请填写完整内容")
            }
        },

        addChildCancel(){
            this.childData = {
                name:"",
                type:"",
                budget:""
            }
        },

        scenesConfirm(value){
            this.formData.scenes = value
            this.scenesPicker = false
        },

        startTimeConfirm(date){
            this.formData.startTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.startTimeCalendar = false;
        },

        endTimeConfirm(date){
            this.formData.endTime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.endTimeCalendar = false;
        },

        frequencyConfirm(value){
            this.formData.frequency = value
            this.frequencyPicker = false
        },

        moneyFormatter(value){
            console.log('formatter')
            return '￥' + value
        }

    }
}
</script>

<style scoped>
.childBudget{
    position:relative;
    font-size: 14px;
    padding: 0 25px;
    border-bottom:1px solid #F5F5F5;
    height: 45px;
}
.childBudget_name{
    position: absolute;
    left:25px;
    top:15px;
}
.childBudget_budget{
    position: absolute;
    right: 75px;
    top: 15px;
}
.childBudget_delete{
    position: absolute;
    right: 25px;
    top:15px;
    text-decoration: underline;
    color: #E58B37;
}
</style>