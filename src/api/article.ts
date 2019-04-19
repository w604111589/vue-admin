import request from '@/utils/request';


export function fetchList(query: any) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query,
  });
}

export function fetchArticle(id: any) {
  return request({
    url: '/article/detail',
    method: 'get',
    params: { id },
  });
}

export function fetchPv(pv: any) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv },
  });
}

export function createArticle(data: any) {
  return request({
    url: '/article/create',
    method: 'post',
    data,
  });
}

export function updateArticle(data: any) {
  return request({
    url: '/article/update',
    method: 'post',
    data,
  });
}

export function updateMarkdown(data: any){
  return request({
    url: '/article/update',
    method: 'post',
    data,
  });
}
