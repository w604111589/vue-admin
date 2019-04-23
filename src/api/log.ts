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

