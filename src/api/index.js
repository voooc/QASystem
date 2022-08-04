import axios from './request'

const ip = 'http://127.0.0.1:8000'
const baseUrl = `${ip}/api/v1`
// 获取搜索结果
export function getSearchResult (qusetion) {
  return axios.get(`${baseUrl}/answer?q=${qusetion}`)
}
// 根据输入的部分文本获取搜索建议
export function getSearchSuggest (someText) {
  return axios.get(`${baseUrl}/search/suggest?input=${someText}`)
}
// 登录
export function login (username, password) {
  return axios.post(`${baseUrl}/jwt/create`,
    {
      username: username,
      password: password
    }
  )
}
// 注册
export function register (username, email, password, rePassword) {
  return axios.post(`${baseUrl}/users/`, {
    username: username,
    email: email,
    password: password,
    re_password: rePassword
  })
}
// 获取用户资料
export function getUser () {
  return axios.get(`${baseUrl}/users/me`)
}
// 验证token是否失效
export function authorization (token) {
  return axios.post(`${baseUrl}/jwt/verify`, {
    token: token
  })
}
// 通过刷新token进行刷新
export function refreshToken (refresh) {
  return axios.post(`${baseUrl}/jwt/refresh`, {
    refresh: refresh
  })
}
// 激活账号
export function activate (uid, token) {
  return axios.post(`${baseUrl}/users/activation/`, {
    uid: uid,
    token: token
  })
}
