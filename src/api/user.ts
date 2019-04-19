import request from '@/utils/request';

// const customUrl = 'http://localhost:9091';
const customUrl = '';

export function userSearch(query: any) {
  return request({
    url: customUrl + '/user/search',
    method: 'get',
    params: query,
  });
}

export function uploadAvatar(query: any) {
  return request({
    url: '/user/avatar',
    method: 'get',
    params: query,
  });
}
