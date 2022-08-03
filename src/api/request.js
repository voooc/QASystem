import axios from 'axios'
import store from '@/store'

axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencodedcharset=UTF-8multipart/form-data'

// 添加请求拦截器，在请求头中加token
axios.interceptors.request.use(
  config => {
    if (store.state.Jwt !== '') {
      console.log('将token添加进入请求头之中...')
      config.headers.Authorization = 'JWT ' + store.state.Jwt.access
    }
    return config
  },
  error => {
    return Promise.reject(error)
  })

// 响应 拦截
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response) {
      console.log(error.response)
    }
    return Promise.reject(error.response) // 返回接口返回的错误信息
  }
)
export default axios
