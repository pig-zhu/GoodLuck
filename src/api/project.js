import request from '@/utils/request'

export function getProjectList (parameter) {
    return request({
      url: '/queryTaskList',
      method: 'post',
      data: parameter
    })
}