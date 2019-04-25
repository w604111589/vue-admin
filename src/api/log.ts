import request from '@/utils/request';

export const getLog = (params: any) =>
  request({
    url: 'user/loginlog',
    method: 'get',
    params,
  });

export const getMessage = (params: any) =>
  request({
    url: '/message',
    method: 'get',
    params,
  });


export const getLabel = (params?: any) =>
  request({
    url: 'label/index',
    method: 'get',
    params,
});

export const createLabel = (data: any) =>
  request({
    url: 'label/create',
    method: 'post',
    data,
});

export const updateLabel = (data: any) =>
  request({
    url: 'label/update',
    method: 'post',
    data,
});

