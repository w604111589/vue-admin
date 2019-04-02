import request from '@/utils/request';

export const getList = (params: any) =>
  request({
    url: '/table/list',
    method: 'get',
    params,
  });

export const getSonUser = (params: any) =>
  request({
    url: '/user/son_user',
    method: 'get',
    params,
});

export const createUser = (data: any) =>
  request({
    url: '/user/son_user',
    method: 'post',
    data,
});

