import request from '@/utils/request';


const customUrl = 'http://localhost:9091';

export function userSearch(author: any) {
  return request({
    url: customUrl + '/user/search',
    method: 'get',
    params: { author },
  });
}
