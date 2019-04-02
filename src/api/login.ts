import request from '@/utils/request';

export const login = (username: string, password: string) =>
  request({
    url: '/user/login',
    method: 'post',
    data: {
      user_name: username,
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
