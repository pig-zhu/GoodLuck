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

// 删除项目
export function delProject (parameter) {
  return request({
    url: '/delProject',
    method: 'post',
    data: parameter
  })
}
// 编辑项目状态和人员
export function editProject (parameter){
  return request({
    url: '/editTask',
    method: 'post',
    data: parameter
  })
}
// 订阅报警
export function alarms (parameter){
  return request({
    url: '/alarms',
    method: 'post',
    data: parameter
  })
}