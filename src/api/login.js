import request from '@/utils/request'

const userApi = {
  Login: '/login',
  ForgePassword: '/forge-password',
  Register: '/register',
  SendSms: '/account/sms',
  SendSmsErr: '/account/sms_err',
  // get my info
  UserInfo: '/getRouteInfo',
  UserMenu: '/user/nav'
}

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 *     remember_me: true,
 *     captcha: '12345'
 * }
 * @param parameter
 * @returns {*}
 */
export function login (parameter) {
  return request({
    url: userApi.Login,
    method: 'post',
    data: parameter
  })
}

export function getRouteInfo (parameter) {
  return request({
    url: userApi.UserInfo,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

export function getCurrentUserNav () {
  return request({
    url: userApi.UserMenu,
    method: 'get'
  })
}

export function register (parameter) {
  return request({
    url: userApi.Register,
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
