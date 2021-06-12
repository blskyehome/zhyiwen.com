/**
 * axios 请求工具类
 * @author wanghaotian
 */
/* eslint-disable */
import axios from './interceptors'

/**
 * 请求方法封装
 * 方便统一管理加载提示、错误异常提示、操作成功提示
 * @type {{getList: (function(*=): (PromiseLike<T | never> | Promise<T | never> | *)), getOne: (function(*=): (PromiseLike<T | never> | Promise<T | never> | *)), save: (function(*=): (PromiseLike<T | never> | Promise<T | never> | *)), delete: (function(*=): (PromiseLike<T | never> | Promise<T | never> | *)), base: (function(*=): Promise<AxiosResponse<any>>)}}
 */
const request = {
  /**
   * url前缀
   */
  api_pre: function() {
    return process.env.VUE_APP_BACKEND_URI
  },
  /**
   * 给url拼接版本号(解决IE11数据不刷新的问题)
   * @param url
   * @returns {string}
   */
  version: function(url) {
    const timestamp = new Date().getTime()
    let opt = '?'
    if (url.indexOf('?') !== -1) {
      opt = '&'
    }
    return opt + 'v=' + timestamp
  },
  /**
   * axios原始方法
   * @param options
   * @returns {Promise<AxiosResponse<any> | never>}
   */
  axios: function(options) {
    options.url = request.api_pre() + options.url + request.version(options.url)
    return axios(options)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      })
  },
  /**
   * 最基础的用法：类似this.axios，差别在有统一的提示
   * @param options
   * @returns {Promise<AxiosResponse<any>>}
   */
  base: function(options) {
    if (options.isShowLoading === undefined) {
      options.isShowLoading = true
    }
    if (options.isShowMessage === undefined) {
      options.isShowMessage = true
    }
    if (options.isShowLoading) {
      // TODO 请求时需要加载效果
      // uiUtil.loadingBar.start()
    }
    options.url = request.api_pre() + options.url + request.version(options.url)
    return axios(options)
      .then(response => {
        return response
      })
      .catch(error => {
        return Promise.reject(error)
      }).finally(() => {
        if (options.isShowLoading) {
          // 关闭加载
          // TODO 请求时应该关闭加载效果
          // uiUtil.loadingBar.finish()
        }
      })
  },
  /**
   * get--基础的get方法，获取成功时没有任何提示；使用场景：例如打开新增页时需要给表单赋默认值，例如附件id
   * @param options
   * @returns {PromiseLike<T | never> | Promise<T | never> | *}
   */
  get: function(options) {
    options.method = 'get'
    return this.base(options)
      .then(function(response) {
        return response
      })
  },
  /**
   * post--基础的post请求；使用场景：例如向后台请求更新状态
   * @param options
   * @returns {PromiseLike<T | never> | Promise<T | never> | *}
   */
  post: function(options) {
    options.method = 'post'
    return this.base(options)
      .then(function(response) {
        return response
      })
  },
}
export default request
