const express = require('express')
const mysql = require('mysql')
const nodemailer = require('nodemailer')
const AipOcrClient = require("baidu-aip-sdk").ocr

const APP_ID = "16039629"
const API_KEY = "HMf7GPeq5CnlWNR5QRpugiSv"
const SECRET_KEY = "qiUGFYQmUklGsaqm9we2sGMFrfspz2Nb"


const app = express()

// 创建百度api对象
const client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

// 获取文字识别转换结果
app.post('/img', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        console.log(obj.img)
        client.generalBasic(obj.img).then(function(result) {
            console.log(JSON.stringify(result));
            res.send(JSON.stringify(result))
        }).catch(function(err) {
            // 如果发生网络错误
            console.log(err);
            res.send('识别失败')
        })
    })
})

// 设置连接数据库信息
const sql = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'gp'
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
app.post('/login', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('select * from gp_user where user = ?', [obj.user], function (error, results) {
            if (error) {
                res.send({
                    status: 'login error'
                })
            } else {
                if (results[0] == undefined) {
                    res.send({
                        status: 'no user'
                    })
                } else {
                    if (results[0].pwd == obj.pwd) {
                        console.log('用户' + obj.user + '登录系统成功')
                        res.send({
                            status: 'login success',
                            info: results[0]
                        })
                    } else {
                        res.send({
                            status: 'pwd error'
                        })
                    }
                }
            }
        })
    })
})

// 接收注册请求，post方式传输，{user:'user';pwd:'pwd';mail:'mail';head:'head'}，三条数据非空，user为主键不能重复，后端插入直接返回结果；前端验证邮箱格式
//其中head为前端随机生成，表示头像
app.post('/signin', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        // console.log(obj)
        sql.query('insert into gp_user(user,pwd,mail,head_portrait) values(?,?,?,?)', [obj.user, obj.pwd, obj.mail, obj.head], function (error, results) {
            if (error) {
                res.send('signin error')
            } else {
                res.send({info: 'signin success', user: obj.user})
            }
        })
    })
})

// 忘记密码，post方式接收，{mail:'mail'}，通过邮件方式将账号密码发送到指定邮箱
app.post('/findpwd', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('select * from gp_user where mail = ?', [obj.mail], function (error, results) {
            if (error) {
                res.send('error')
            } else {
                if (results[0].user == '') {
                    res.send('no user finded')
                } else {
                    let mailOptions = {
                        from: '2123147840@qq.com',
                        to: obj.mail,
                        subject: '账号密码找回',
                        text: '账号：' + results[0].user + ' ，密码：' + results[0].pwd
                    }
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            res.send('findpwd success')
                        }
                    })
                }
            }
        })
    })
})

// 返回当前用户的所有病例记录，post方式接收，{user:'user'}
app.post('/getinfo', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('select * from gp_info where user = ? order by clinic_time desc', [obj.user], function (error, results) {
            if (error) {
                res.send('404')
            } else {
                // console.log(results)
                res.send(results)
            }
        })
    })
})

// 通过病历id返回信息，post方式接收，{id:'id'}
app.post('/selectid', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('select * from gp_info where id = ?', [obj.id], function (error, results) {
            if (error) {
                res.send('404')
            } else {
                // console.log(results)
                res.send(results)
            }
        })
    })
})

// 获取当前用户的全部病历记录中name项
app.post('/namelist', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('select distinct name from gp_info where user = ?', [obj.user], function (error, results) {
            if (error) {
                res.send('404')
            } else {
                res.send(results)
            }
        })
    })
})

// 创建用户病历，post方式发送数据
app.post('/create', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        // console.log(obj)
        sql.query('insert into gp_info(id,user,clinic_time,clinic_place,name,sex,birth,nation,marry,job,work_unit,address,allergy_history,division,main_suit,present_illness,history_illness,examine,diagnose,cure,advice,doctor,share,release_time,user_icon) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [obj.id, obj.user, obj.clinic_time, obj.clinic_place, obj.name, obj.sex, obj.birth, obj.nation, obj.marry, obj.job, obj.work_unit, obj.address, obj.allergy_history, obj.division, obj.main_suit, obj.present_illness, obj.history_illness, obj.examine, obj.diagnose, obj.cure, obj.advice, obj.doctor, obj.share, obj.release_time, obj.user_icon], function (error, results) {
            if (error) {
                console.log(error)
                res.send('create record error')
            } else {
                res.send('create success')
            }
        })
    })
})

//删除用户病历，post方式发送数据
app.post('/delete', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('DELETE FROM gp_info where id= ?', [obj.id], function (error, results) {
            if (error) {
                res.send('delete info error')
            } else {
                res.send('delete success')
            }
        })
    })
})

// 修改用户病历数据，post方式发送
app.post('/modify', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('update gp_info set user=?,clinic_time=?,clinic_place=?,name=?,sex=?,birth=?,nation=?,marry=?,job=?,work_unit=?,address=?,allergy_history=?,division=?,main_suit=?,present_illness=?,history_illness=?,examine=?,diagnose=?,cure=?,advice=?,doctor=? where id=?', [obj.user, obj.clinic_time, obj.clinic_place, obj.name, obj.sex, obj.birth, obj.nation, obj.marry, obj.job, obj.work_unit, obj.address, obj.allergy_history, obj.division, obj.main_suit, obj.present_illness, obj.history_illness, obj.examine, obj.diagnose, obj.cure, obj.advice, obj.doctor, obj.id], function (error, results) {
            if (error) {
                res.send('modify error')
            } else {
                res.send('modify success')
            }
        })
    })
})

// 是否分享到广场，post接收参数，{id：当前病历id；states：当前分享状态}
app.post('/share', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        if (obj.status == '已分享到广场') {
            sql.query('update gp_info set share = "未分享到广场" where id = ?', [obj.id], function (error, results) {
                if (error) {
                    res.send('error')
                } else {
                    res.send('success')
                }
            })
        } else {
            sql.query('update gp_info set share = "已分享到广场" where id = ?', [obj.id], function (error, results) {
                if (error) {
                    res.send('error')
                } else {
                    res.send('success')
                }
            })
        }
    })
})

// 获取病历广场的内容，post方式接收请求
app.post('/square', function (req, res) {
    sql.query('select * from gp_info where share = "已分享到广场"', [], function (error, results) {
        if (error) {
            res.send('askinfo error')
        } else {
            res.send(results)
        }
    })
})


// 查看留言，post方式接收,接收当前用户名
app.post('/askmsg', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('select * from gp_msg where user_to = ?', [obj.user], function (error, results) {
            if (error) {
                res.send('get msg error')
            } else {
                res.send(results)
            }
        })
    })
})

// 创建留言，post方式接收,其中留言信息最多200字，前端限制
app.post('/createmsg', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        // console.log(obj)
        sql.query('insert into gp_msg(user_from,user_to,msg,time,user_icon) values(?,?,?,?,?)', [obj.user_from, obj.user_to, obj.msg, obj.time, obj.user_icon], function (error, results) {
            if (error) {
                res.send('set msg error')
            } else {
                res.send('set msg success')
            }
        })
    })
})

//删除用户病历，post方式发送数据
app.post('/deletemsg', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('DELETE FROM gp_msg where id= ?', [obj.id], function (error, results) {
            if (error) {
                res.send('delete info error')
            } else {
                res.send('delete success')
            }
        })
    })
})

// 获取用户当前名字下的诊断内容，post方式接收，{user:'user',name:'name'}
app.post('/getsuit', function (req, res) {
    req.on('data', function (data) {
        let obj = JSON.parse(data)
        sql.query('select diagnose from gp_info where user = ? and name = ?', [obj.user, obj.name], function (error, results) {
            if (error) {
                res.send('ask info error')
            } else {
                res.send(results)
            }
        })
    })
})


app.listen(3000, function () {
    console.log('nodeJs服务启动')
})