import request from '@/utils/request'
import { encodeurl } from '@/utils/aibook'
// 用户相关

// 用户注册
// 请求头：
//   user_name：string
//   password：string
//   email: string
//   phone: string
export function userRegister(data) {
    return request({
        url: '/api/HttpService/Register',
        method: 'post',
        data: encodeurl(data)
    })
}

// 用户登录
// 请求头：
//   user_name：string
//   password：string
export function userLogin(data) {
    return request({
        url: '/api/HttpService/Login',
        method: 'post',
        data: encodeurl(data)
    })
}

// 修改密码
// 请求头：
//   token：string 登陆时返回的字符串
//   password：string新密码
export function userUpdatePassword(data) {
    return request({
        url:'/api/HttpService/UpdatePassword',
        method: 'post',
        data: encodeurl(data)
    })
}

// 更新用户信息
// 请求头：
//   token：string 登陆时返回的字符串
//   email：string 邮箱
//   phone：string 电话
export function userUpdateUserInfo(data) {
    return request({
        url:'/api/HttpService/UpdateUserInfo',
        method: 'post',
        data: encodeurl(data)
    })
}

// 获取用户信息
// 请求头：
//   token：string 登陆时返回的字符串
export function userGetUserInfo(data) {
    return request({
        url:'/api/HttpService/GetUserInfo',
        method: 'post',
        data: encodeurl(data)
    })
}

// 更新默认收货地址
// 请求头：
//   token：string 登陆时返回的字符串
//   address：string 地址
//   receiver：收货人
//   zipcode：邮编
//   phone：电话
export function userUpdateAddress(data) {
    return request({
        url:'/api/HttpService/UpdateAddress',
        method: 'post',
        data: encodeurl(data)
    })
}

// 获取默认收货地址
// 返回json字符串 如：
//   status：string,“succeed” 或者 “failed” 
//   err_msg：string, “错误提示”
//   address：string 地址
//   receiver：收货人
//   zipcode：邮编
//   phone：电话
export function userGetAddress(data) {
    return request({
        url:'/api/HttpService/GetAddress',
        method: 'post',
        data: encodeurl(data)
    })
}

// 退出登录
// 请求头：
//   token：string 登陆时返回的字符串
export function userLogout(data) {
    return request({
        url:'/api/HttpService/Logout',
        method: 'post',
        data: encodeurl(data)
    })
}
