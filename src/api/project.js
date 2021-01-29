import request from '@/utils/request'

export function getProjectList (parameter) {
    return request({
      url: '/queryTaskList',
      method: 'post',
      data: parameter
    })
}

export function addProject (parameter) {
  return request({
    url: '/addTask',
    method: 'post',
    data: parameter
  })
}

// 查询所有用户
export function getUserList (parameter) {
  return request({
    url: '/allUserList',
    method: 'post',
    data: parameter
  })
}