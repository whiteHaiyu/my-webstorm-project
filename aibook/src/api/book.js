import request from '@/utils/request'
import { encodeurl } from '@/utils/aibook'
// 图书相关

// 生成图书
// 请求头：
//   token：string 可选 登陆时返回的字符串，
//   character_name：主人公名字，只支持英文字母
//   character_id：string 主角肖像的id
//   gender：string，girl或者boy
//   story_name: string 选择的故事名字
export function GenBook(data) {
    return request({
        url: '/api/HttpService/GenBook',
        method: 'post',
        data: encodeurl(data)
    })
}
