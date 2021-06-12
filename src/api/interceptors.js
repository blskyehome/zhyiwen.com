/**
 * axios 拦截
 * @author wanghaotian
 */

import axios from 'axios'
const instance = axios.create({
  headers: {
    'content-type': 'application/json'
  }
})

// http request 拦截器
instance.interceptors.request.use(
  config => {
    // TODO token 获取
    // const token = localStorage.getItem('token')
    // // 判断是否存在token，如果存在的话，则每个http header都加上token
    // if (token) {
    //   // 请求头加上token g
    //   config.headers.authorization = token
    // }
    console.log('请求拦截器')
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
instance.interceptors.response.use(
  response => {
    // 拦截响应，做统一处理
    console.log('响应拦截器')
    const code = response.status
    if (code !== 200) {
      // TODO 统一提示错误信息
      return Promise.reject(response.data.message)
    }
    return response
  },
  // 接口错误状态处理，也就是说无响应时的处理
  error => {

    const status = error.response.status
    // 注意：这里是http的状态，如果需要通过自定义状态码需要在上一段代码实现
    if (status === 401) {
      // TODO 401时为用户未登录，需要自动跳转到登录页
      return Promise.reject(error)
    }
    return Promise.reject(error)
  })

export default instance
