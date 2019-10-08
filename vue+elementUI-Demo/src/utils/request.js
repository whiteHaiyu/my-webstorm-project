import axios from 'axios'
import { Message } from "element-ui"
import store from '@/store'
import { getToken } from "@/utils/auth"

// 创建axios服务
const service = axios.create({
  baseURL: 'http://',   //url = baseURL + requestURL
  timeout: 5000
})

// 过滤器，在发送请求前对数据包进行处理
service.interceptors.request.use(
  config => {
    if(store.getters.token){
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 过滤器，对收到的数据包进行处理
service.interceptors.response.use(
  response => {
    const res = response.data

    if(res.status == 200){
      console.log('get info success')
    }
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
