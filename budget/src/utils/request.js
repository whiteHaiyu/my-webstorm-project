import axios from 'axios'
import Vue from 'vue';

Vue.use(Toast);

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
    timeout:50000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    res => {
        console.log(res)
        if(res.data.code == 200){
            return res.data
        }else{
            Toast({
                message:res.data.errmsg,
                duration:3000
            })
            return
        }
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default service