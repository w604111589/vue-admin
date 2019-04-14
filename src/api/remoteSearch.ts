import request from '@/utils/request'

export function userSearch(name: any) {
  return request({
    url: '/search/user',
    method: 'get',
    params: { name }
  })
}
