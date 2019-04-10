const express = require('express')
const mysql = require('mysql')
const nodemailer = require('nodemailer')

const server = express()
// 数据库信息
const sql = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'mysqltest'
})
// 邮件服务器
const transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '511383637@qq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: 'ksxypzkuathbbihj'
    }
});

// 连接数据库
sql.connect()

// 设置CORS跨域
server.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", ' 3.2.1')
    next();
});

// 数据库查询
server.post('/askinfo',function (req,res) {
    sql.query('select * from mytable',function (error,results) {
        if(error){
            res.send({code:403,message: "error"})
        }else{
            res.send({code: 200, message: "askinfo success", data: results, total: results.length})
        }
    })
})

// 数据库添加
server.post('/addinfo',function(req,res){
    sql.query('insert into mytable(id,name) values(?,?)',[req.query.id,req.query.name],function(error,results){
        if(error){
            res.send({code:403,message: "error"})
        }else{
            res.send({code:200,message:"addinfo success",data:req.query})
        }
    })
})

// 数据库删除
server.post('/delinfo',function(req,res){
    sql.query('delete from mytable where id=?',[req.query.id],function(error,results){
        if(error){
            res.send({code:403,message: "error"})
        }else{
            res.send({code:200,message:"delinfo success",data:req.query})
        }
    })
})

// 调用邮件发送
server.post('/sendmail',function (req,res) {
    let mailOptions = {
        from: '511383637@qq.com', // 发件地址
        to: '2083000569@qq.com', // 收件列表
        subject: 'Hello sir', // 标题
        text: 'Hello world ?', // 标题
        // html: '<b>Hello world ?</b>' // html 内容
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
})

// 账号密码登陆功能+后端验证
server.post('/login',function(req,res){
    // req.on('data',function(data))读取用户发来的数据
    req.on('data',function(data){
        let obj=JSON.parse(data)
        // console.log(obj)
        sql.query('select pwd from usertest where user=?',[obj.user],function(error,results){
            if(error){
                res.send('error')
            }else{
                if(results[0].pwd == obj.pwd){
                    res.send('login success')
                }else{
                    res.send('pwd error')
                }
            }
        })
    })
})

server.listen(3000,function () {
    console.log('nodeJs服务启动')
})