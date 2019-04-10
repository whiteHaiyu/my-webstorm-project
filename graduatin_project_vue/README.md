# graduatin_project_vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 技术选择
```bash
基于Android的开发->webapp模式
前端：vue框架，vue-router实现路由跳转，vuex数据驱动
后端：nodeJs搭建服务器，连接MySQL数据库

用HBuilder打包生成.apk文件
前后端ajax进行数据交互，所有内容信息存储在数据库，客户端不保存任何数据
```

#数据库设计
```$xslt
  gp_user  存储用户信息，user、password、mail
  gp_info  存储用户病历内容，其中生成32位随机字符串作为唯一标识
```

#代码目录
```$xslt
#create.vue   录入病历信息
#detail.vue   详细展示病历内容
#forget.vue   登录忘记密码页，输入注册时邮箱，账号密码发送到邮箱
#homepage.vue   主页，瀑布流形式展示病历记录
#login.vue    登录界面，输入账户名密码，确认、取消
#modify.vue   用户对病历进行内容修改，基本同录入信息
#signin.vue   注册用户，输入用户名、密码、确认密码、邮箱，要求用户名及邮箱唯一
#welcome.vue    打开应用后首页，登录和注册按钮

未完成功能：
#病历分享，输入对方账号将病历分享
#拍摄图片识别图片文字
  调用手机摄像头功能，使用canvas截取屏幕信息，保存文件转码base64保存，blob对象
  1、调用百度API，发送base64格式图片，返回图片中文字信息
  2、Node+OCR图片文字识别
#身体部位展示
  人体轮廓图区域划分，根据病历信息获取部位，计数
  多块png图片拼接，根据计数确定展示部位颜色
  右侧展示{部位：次数}

```
