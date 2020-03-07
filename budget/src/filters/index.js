// 补全价格标示
export const moneyCompletion = value => {
    if(value){
        return "￥" + value
    }else{
        return value
    }
}


// 空值->请选择
export const transEmpty = value => {
    if(value){
        return value
    }else{
        return "请选择"
    }
}

// 转换级联选择样式
export const transCascade = value => {
    if(value instanceof Array){
        if (value.length == 2) {
            return value[0] + " > " + value[1]
        }else{
            return "请选择"
        }
    }else {
        return value == null ? "请选择":value
    }
}

// 时间展示转换
export const timeFilter = (dateStr, time) => {
    var date = new Date(dateStr);
    var year = date.getFullYear();
    //ES6语法填充：var month = (date.getMonth()+1).toString().padStart(2, '0');
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    var hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    var mm = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    var ss = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();

    //return `${year}-${month}-${day}`;

    if (time && time.toLowerCase() === 'yyyy-mm-dd') {
        // 用模板字符串拼接
        return `${year}-${month}-${day}`;
    } else if (time && time.toLowerCase() === 'hh:mm:ss') {
        return `${hh}:${mm}:${ss}`;
    } else {
        return `${year}-${month}-${day} ${hh}:${mm}`;
    }
}