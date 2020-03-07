import request from '@/utils/request'
import { encodeurl } from '@/utils/aibook'

// 用户注册
export function userRegister(data) {
    return request({
        url: '/api/HttpService/Register',
        method: 'post',
        data: encodeurl(data)
    })
}

// 用户登录
export function userLogin(data) {
    return request({
        url: '/api/HttpService/Login',
        method: 'post',
        data: encodeurl(data)
    })
}
