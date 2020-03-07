import request from '@/utils/request'
import { encodeurl } from '@/utils/aibook'
// 获取图书
export function GenBook(data) {
    return request({
        url: '/api/HttpService/GenBook',
        method: 'post',
        data: encodeurl(data)
    })
}
