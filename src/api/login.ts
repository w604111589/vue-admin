import request from '@/utils/request';

export const login = (username: string, password: string) =>
  request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
    },
  });

export const getInfo = (token: string) =>
  request({
    url: '/user/index',
    method: 'get',
    params: { token },
  });

export const logout = () =>
  request({
    url: '/user/logout',
    method: 'post',
  });


export const registerUser = (query: any) =>
  request({
    url: '/register',
    method: 'post',
    data: query,
  });

