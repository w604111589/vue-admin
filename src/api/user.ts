import request from '@/utils/request';

const customUrl = 'http://localhost:9091';

export function userSearch(query: any) {
  return request({
    url: customUrl + '/user/search',
    method: 'get',
    params: query,
  });
}
