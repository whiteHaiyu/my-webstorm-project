const express = require('express')
const mysql = require('mysql')
const nodemailer = require('nodemailer')

const app = express()

// 设置连接数据库信息
const sql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'gp'
})

// 设置邮箱服务器
const transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '2123147840@qq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: 'hgyyomrmgyubbfab'
    }
})

// 连接数据库
sql.connect()

// 设置CORS跨域参数，允许来自localhost:8080的跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1')
    next();
});

// 接收登录的请求，post方式传输，{user:'user';pwd:'pwd'}
app.post('/login',function (req,res) {
    req.on('data',function (data) {
        let obj = JSON.parse(data)
        sql.query('select pwd from gp_user where user = ?',[obj.user],function (error,results) {
            if(error){
                res.send('login error')
            }else{
                if(results[0] == undefined){
                    res.send('no user')
                }else{
                    if(results[0].pwd == obj.pwd){
                        console.log('用户'+obj.user+'登录系统成功')
                        res.send('login success')
                    }else{
                        res.send('pwd error')
                    }
                }
            }
        })
    })
})

// 接收注册请求，post方式传输，{user:'user';pwd:'pwd';mail:'mail'}，三条数据非空，user为主键不能重复，后端插入直接返回结果；前端验证邮箱格式
app.post('/signin',function(req,res) {
    req.on('data',function(data) {
        let obj = JSON.parse(data)
        sql.query('insert into gp_user(user,pwd,mail) values(?,?,?)',[obj.user,obj.pwd,obj.mail],function(error,results) {
            if(error){
                res.send('signin error')
            }else{
                res.send({info:'signin success',user:obj.user})
            }
        })
    })
})

// signin postmanTest
// app.post('/signin',function(req,res) {
//     sql.query('insert into gp_user(user,pwd,mail) values(?,?,?)',[req.query.user,req.query.pwd,req.query.mail],function(error,results) {
//         if(error){
//             console.log('error')
//         }else{
//             console.log('success')
//             res.send({info:'signin success',user:req.query.user})
//         }
//     })
// })

// 忘记密码，post方式接收，{mail:'mail'}，通过邮件方式将账号密码发送到指定邮箱
app.post('/findpwd',function(req,res) {
    req.on('data',function(data) {
        let obj = JSON.parse(data)
        sql.query('select * from gp_user where mail = ?',[obj.mail],function(error,results) {
            if(error){
                res.send('error')
            }else{
                if(results[0].user == ''){
                    res.send('no user finded')
                }else{
                    let mailOptions = {
                        from: '2123147840@qq.com',
                        to: obj.mail,
                        subject: '账号密码找回',
                        text: '账号：'+results[0].user+' ，密码：'+results[0].pwd
                    }
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            console.log(error);
                        }else{
                            res.send('findpwd success')
                        }
                    })
                }
            }
        })
    })
})

// 返回当前用户的所有病例记录，post方式接收，{user:'user'}
app.post('/getinfo',function (req,res) {
    req.on('data',function (data) {
        let obj = JSON.parse(data)
        sql.query('select * from gp_info where user = ?',[obj.user],function(error,results) {
            if(error){
                res.send('404')
            }else{
                // console.log(results)
                res.send(results)
            }
        })
    })
})

// 创建用户病历，post方式发送数据
app.post('/create',function(req,res) {
    req.on('data',function(data) {
        let obj = JSON.parse(data)
        console.log(obj)
        sql.query('insert into gp_info(id,user,clinic_time,clinic_place,name,sex,birth,nation,marry,job,work_unit,address,allergy_history,division,main_suit,present_illness,history_illness,examine,diagnose,cure,advice,doctor) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[obj.id,obj.user,obj.clinic_time,obj.clinic_place,obj.name,obj.sex,obj.birth,obj.nation,obj.marry,obj.job,obj.work_unit,obj.address,obj.allergy_history,obj.division,obj.main_suit,obj.present_illness,obj.history_illness,obj.examine,obj.diagnose,obj.cure,obj.advice,obj.doctor],function(error,results) {
            if(error){
                console.log(error)
                res.send('create record error')
            }else{
                res.send('create success')
            }
        })
    })
})

//删除用户病历，post方式发送数据
app.post('/delete',function(req,res) {
    req.on('data',function(data) {
        let obj = (JSON.parse(data))
        console.log(obj)
        sql.query('DELETE FROM gp_info where id= ?',[obj.id],function(error,results) {
            if(error){
                res.send('delete info error')
            }else{
                res.send('delete success')
            }
        })
    })
})

app.listen(3000,function () {
    console.log('nodeJs服务启动')
})