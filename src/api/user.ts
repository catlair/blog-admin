import { ErrorMessageMode } from '#/axios'
import { defHttp } from '@/utils/http/axios'
import { LoginParams, LoginResultModel } from './model/userModel'

enum Api {
  Login = '/auth/login',
  UserInfo = '/user/me',
  EmailCode = '/email/code',
  PassReset = '/auth/password/reset',
  CheckToken = '/auth'
}

export function loginApi(data: LoginParams, mode?: ErrorMessageMode) {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      data
    },
    { errorMessageMode: mode || 'message' }
  )
}

export function getUserApi() {
  return defHttp.get<any>({
    url: Api.UserInfo
  })
}

/**
 * 邮箱验证码
 */
export function emailCodeApi(data: { to: string }) {
  return defHttp.post<any>({
    url: Api.EmailCode,
    data
  })
}

/**
 * 重置密码
 */
export function passResetApi(data: {
  username: string
  email: string
  code: string
  password: string
}) {
  return defHttp.post<{ msg: string }>(
    {
      url: Api.PassReset,
      data
    },
    {
      errorMessageMode: 'message'
    }
  )
}

/**
 * 校验 jwt token
 */
export function checkTokenApi() {
  return defHttp.get<boolean>({
    url: Api.CheckToken
  })
}
