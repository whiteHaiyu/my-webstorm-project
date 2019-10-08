const express = require('express')

const app = express()

// 响应头设置，CORS跨域设置Access-Control-Allow-Origin:*
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", true);
    res.header("X-Powered-By", '3.2.1')
    next();
});

// http://localhost:3001/apiTest?key=value...
app.get('/apiTest', function (req,res) {
    let TestData = JSON.stringify( {
        "type": "input",
        "name": "单行文本",
        "icon": "icon-input",
        "options": {
            "width": "100%",
            "defaultValue": "",
            "required": false,
            "dataType": "string",
            "pattern": "",
            "placeholder": "",
            "remoteFunc": "func_1540908864000_94322"
        },
        "key": "1540908864000_94322",
        "model": "input_1540908864000_94322",
        "rules": [
            {
                "type": "string",
                "message": "单行文本格式不正确"
            }
        ]
    } )
    // 打印请求的参数
    console.log(req.query)
    // 返回数据
    res.send(TestData)
})

app.post('/apiTest2', function (req, res) {
    let TestData = {
        data1:'data1',
        data2:'data2'
    }
    req.on('data', function(data){
        let obj = JSON.parse(data)
        // 打印请求的参数
        console.log(obj)
    })
    // 返回数据
    res.send(TestData)
})

app.listen(3001, function () {
    console.log('Node服务器启动成功')
})
