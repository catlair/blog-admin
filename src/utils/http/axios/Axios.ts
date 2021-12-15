import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import qs from 'qs'
import { cloneDeep } from 'lodash-es'
import { CreateAxiosOptions } from './axiosTransform'
import { AxiosCanceler } from './axiosCancel'
import { isFunction } from '@/utils/is'
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum'
import { RequestOptions, Result, UploadFileParams } from '#/axios'

/**
 * @description axios 封装
 */
export class VAxios {
  // axios 实例
  private axiosInstance: AxiosInstance
  // 配置
  private readonly options: CreateAxiosOptions

  constructor(options: CreateAxiosOptions) {
    this.options = options
    this.axiosInstance = axios.create(options)
    this.setupInterceptors()
  }

  /**
   * 创建一个 axios 实例
   */
  private createAxiosInstance(options: CreateAxiosOptions) {
    this.axiosInstance = axios.create(options)
  }

  private getTransform() {
    return this.options.transform
  }

  getAxios() {
    return this.axiosInstance
  }

  /**
   * 重新设置 axios 实例
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return
    }
    this.createAxiosInstance(config)
  }

  /**
   * 设置请求头
   */
  setHeaders(headers: any) {
    if (!this.axiosInstance) {
      return
    }
    Object.assign(this.axiosInstance.defaults.headers, headers)
  }

  /**
   * 拦截器配置
   */
  private setupInterceptors() {
    const transform = this.getTransform()
    if (!transform) {
      return
    }

    const {
      requsetInterceptors,
      requestInterceptorsCatch,
      responseInterceptors,
      responseInterceptorsCatch
    } = transform

    const axiosCanceler = new AxiosCanceler()

    // 请求拦截器
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      const {
        // @ts-ignore
        headers: { ignoreCancelToken }
      } = config

      const ignoreCancel = Boolean(ignoreCancelToken)
        ? ignoreCancelToken
        : this.options.requestOptions?.ignoreCancelToken

      !ignoreCancel && axiosCanceler.addPending(config)

      if (requsetInterceptors && isFunction(responseInterceptors)) {
        config = requsetInterceptors(config, this.options)
      }

      return config
    }, undefined)

    // 请求错误拦截器
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch)

    // 响应拦截器
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config)
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res)
      }
      return res
    }, undefined)

    // 响应错误拦截器
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch)
  }

  /**
   * 上传文件
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new FormData()
    const customFilename = params.name || 'file'

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename)
    } else {
      formData.append(customFilename, params.file)
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key]
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item)
          })
          return
        }

        formData.append(key, params.data![key])
      })

      return this.axiosInstance.request<T>({
        ...config,
        method: 'POST',
        data: formData,
        headers: {
          'Content-type': ContentTypeEnum.FORM_DATA,
          // @ts-ignore
          ignoreCancelToken: true
        }
      })
    }
  }

  /**
   * 支持 form-data
   */
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers
    const contentType = headers?.['Content-Type'] || headers?.['content-type']

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' })
    }
  }

  get<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.GET }, options)
  }

  post<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.POST }, options)
  }

  put<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.PUT }, options)
  }

  delete<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.DELETE }, options)
  }

  patch<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    return this.request({ ...config, method: RequestEnum.PATCH }, options)
  }

  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config)
    const transform = this.getTransform()
    const { requestOptions } = this.options
    const opt: RequestOptions = Object.assign({}, requestOptions, options)

    const { beforeRequestHook, requestCatchHook, transformRequestHook } = transform || {}

    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt)
    }
    conf.requestOptions = opt
    conf = this.supportFormData(conf)

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformRequestHook && isFunction(transformRequestHook)) {
            try {
              const ret = transformRequestHook(res, opt)
              resolve(ret)
            } catch (error) {
              reject(error || new Error('request error!'))
            }
            return
          }
          resolve(res as unknown as Promise<T>)
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt))
            return
          }
          reject(e)
        })
    })
  }
}
