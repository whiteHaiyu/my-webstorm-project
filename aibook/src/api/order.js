import request from '@/utils/request'
import { encodeurl } from '@/utils/aibook'
// 订单相关

// 下单
// 请求头：
//   token：string 登陆时返回的字符串
//   book_id: string GenBook返回的书籍编号
//   address: string 收货地址
//   name：string 收货人姓名
//   zipcode：string 邮编
//   phone: string 收货人电话
export function orderMakeOrder(data) {
    return request({
        url: '/api/HttpService/MakeOrder',
        method: 'post',
        data: encodeurl(data)
    })
}

// 获取订单数据
// 请求头：
//   token：string 登陆时返回的字符串
export function orderGetOrderList(data) {
    return request({
        url: '/api/HttpService/GetOrderList',
        method: 'post',
        data: encodeurl(data)
    })
}

// 更新订单数据
// 请求头：
//   token_id：string 管理员登陆时返回的字符串
//   order_id: string 随机生成的订单编号  
//   state： string 订单状态，可选，可以为 paid或者shipped或者received 
//   express_provider: string 快递商  可选
//   express_number: string 快递单号 可选
export function orderUpdateOrder(data){
    return request({
        url:'/api/HttpService/UpdateOrder',
        method:'post',
        data: encodeurl(data)
    })
}
