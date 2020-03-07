import axios from 'axios'
import Vue from 'vue'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'

const service = axios.create({
    timeout:50000
})

//拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    res => {
        console.log(res)
        return res.data
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

export default service