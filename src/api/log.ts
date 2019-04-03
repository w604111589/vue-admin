import request from '@/utils/request';

export const getLog = (params: any) =>
  request({
    url: '/user/user_log',
    method: 'get',
    params,
  });

export const getMessage = (params: any) =>
  request({
    url: '/user/message',
    method: 'get',
    params,
  });

