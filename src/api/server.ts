import request from '@/utils/request';


export function fetchCpuList(query: any) {
  return request({
    url: 'server/loadall',
    method: 'get',
    params: query,
  });
}

export function fetchCpuData(query: any) {
  return request({
    url: 'server/loadone',
    method: 'get',
    params: query,
  });
}

