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
        sql.query('select * from gp_info where user = ? order by clinic_time desc',[obj.user],function(error,results) {
            if(error){
                res.send('404')
            }else{
                // console.log(results)
                res.send(results)
            }
        })
    })
})

// 获取当前用户的全部病历记录中name项
app.post('/namelist',function(req,res) {
    req.on('data',function(data) {
        let obj = JSON.parse(data)
        sql.query('select name from gp_info where user = ?',[obj.user],function(error,results) {
            if(error){
                res.send('404')
            }else{
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
        sql.query('insert into gp_info(id,user,clinic_time,clinic_place,name,sex,birth,nation,marry,job,work_unit,address,allergy_history,division,main_suit,present_illness,history_illness,examine,diagnose,cure,advice,doctor,share) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[obj.id,obj.user,obj.clinic_time,obj.clinic_place,obj.name,obj.sex,obj.birth,obj.nation,obj.marry,obj.job,obj.work_unit,obj.address,obj.allergy_history,obj.division,obj.main_suit,obj.present_illness,obj.history_illness,obj.examine,obj.diagnose,obj.cure,obj.advice,obj.doctor,obj.share],function(error,results) {
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
        let obj = JSON.parse(data)
        sql.query('DELETE FROM gp_info where id= ?',[obj.id],function(error,results) {
            if(error){
                res.send('delete info error')
            }else{
                res.send('delete success')
            }
        })
    })
})

// 修改用户病历数据，post方式发送
app.post('/modify',function(req,res) {
    req.on('data',function (data) {
        let obj = JSON.parse(data)
        sql.query('update gp_info set user=?,clinic_time=?,clinic_place=?,name=?,sex=?,birth=?,nation=?,marry=?,job=?,work_unit=?,address=?,allergy_history=?,division=?,main_suit=?,present_illness=?,history_illness=?,examine=?,diagnose=?,cure=?,advice=?,doctor=? where id=?',[obj.user,obj.clinic_time,obj.clinic_place,obj.name,obj.sex,obj.birth,obj.nation,obj.marry,obj.job,obj.work_unit,obj.address,obj.allergy_history,obj.division,obj.main_suit,obj.present_illness,obj.history_illness,obj.examine,obj.diagnose,obj.cure,obj.advice,obj.doctor,obj.id],function(error,results){
            if(error){
                res.send('modify error')
            }else{
                res.send('modify success')
            }
        })
    })
})

// 是否分享到广场，post接收参数，{id：当前病历id；states：当前分享状态}
app.post('/share',function(req,res){
    req.on('data',function(data) {
        let obj = JSON.parse(data)
        if(obj.status == '已分享到广场'){
            sql.query('update gp_info set share = "未分享到广场" where id = ?',[obj.id],function(error,results) {
                if(error){
                    res.send('error')
                }else{
                    res.send('success')
                }
            })
        }else{
            sql.query('update gp_info set share = "已分享到广场" where id = ?',[obj.id],function(error,results) {
                if(error){
                    res.send('error')
                }else{
                    res.send('success')
                }
            })
        }
    })
})

// 获取病历广场的内容，post方式接收请求
app.post('/square',function(req,res) {
    sql.query('select * from gp_info where share = "已分享到广场"',[],function(error,results) {
        if(error){
            res.send('askinfo error')
        }else{
            res.send(results)
        }
    })
})

// 改变当前病历是否分享，post接收请求，接收当前病历的id
app.post('/share',function(req,res) {
    req.on('data',function (data) {
        let obj = JSON.parse(data)
        sql.query('update gp_info set share = 1 where id = ?',[obj.id],function(error,results){
            if(error){
                res.send('change share error')
            }else{
                res.send('share success')
            }
        })
    })
})
app.post('/unshare',function (req,res) {
    req.on('data',function (data) {
        let obj = JSON.parse(data)
        sql.query('update gp_info set share = 0 where id = ?',[obj.id],function(error,results){
            if(error){
                res.send('change share error')
            }else{
                res.send('unshare success')
            }
        })
    })
})

// 查看留言，post方式接收,接收当前用户名
app.post('/askmsg',function (req,res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('select * from gp_msg where user_to = ?', [obj.user], function (error, results) {
            if (error) {
                res.send('get msg error')
            }else{
                res.send(results)
            }
        })
    })
})

// 创建留言，post方式接收,其中留言信息最多200字，前端限制
app.post('/askmsg',function (req,res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('insert into gp_msg(user_from,user_to,msg,time) values(?,?,?,?)', [obj.user_from,obj.user_to,obj.msg,obj.data], function (error, results) {
            if (error) {
                res.send('set msg error')
            }else{
                res.send('set msg success')
            }
        })
    })
})

app.listen(3000,function () {
    console.log('nodeJs服务启动')
})