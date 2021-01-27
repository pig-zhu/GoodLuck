import request from '@/utils/request'

export function getUserSet (parameter) {
    return request({
      url: '/updateUserInfo',
      method: 'post',
      data: parameter
    })
}
  
export function changePwd (parameter) {
  return request({
    url: '/updatePassword',
    method: 'post',
    data: parameter
  })
}