import axios from 'axios';
import qs from 'qs';
import { Message, MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth';
import { UserModule } from '@/store/modules/user';
import config from '@/utils/config';

const service = axios.create({
  // baseURL: process.env.VUE_APP_MOCK_API,
  baseURL: config.BaseUrlCustom,
  timeout: 5000,
});

axios.defaults.headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/json',
};
// Request interceptors
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if ( token ) {
      config.headers['token'] = getToken();
    }
    return config;
  },

  (error) => {
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // Some example codes here:
    // code == 20000: valid
    // code == 50008: invalid token
    // code == 50012: already login in other place
    // code == 50014: token expired
    // code == 60204: account or password is incorrect
    // You can change this part for your own usage.
    const res = response.data;
    if (res.status !== 200) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
      });
      if (res.status === 400) {
        Message({
          message: res.msg,
          type: 'warning',
        });
      }
      if (res.status === 40000 || res.status === 50012 || res.status === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning',
          },
        ).then(() => {
          UserModule.FedLogOut().then(() => {
            // location.reload();  // To prevent bugs from vue-router
          });
        });
      }
      return Promise.reject('error with code: ' + res.status);
    } else {
      return response.data;
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
