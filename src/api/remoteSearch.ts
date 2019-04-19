import request from '@/utils/request';



export function userSearch(author: any) {
  return request({
    url: '/user/search',
    method: 'get',
    params: { author },
  });
}
