import request from '@/utils/request';

const baseUrl = "http://62.234.14.42:8088"
// const baseUrl = "http://localhost:8088"

export function fetchList(query: any) {
  return request({
    url: baseUrl + '/goods/getall',
    method: 'get',
    params: query,
  });
}

export function fetchOne(id: any) {
  return request({
    url: baseUrl + '/goods/get',
    method: 'get',
    params: { id },
  });
}

