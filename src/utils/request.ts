import axios from 'axios';
// import qs from 'qs';
import { Message, MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth';
import { UserModule } from '@/store/modules/user';
import config from '@/utils/config';
import router from '@/router';

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
  (config: any) => {
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
    const res = response.data;
    if (res.status !== 200) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 5 * 1000,
      });
      if (res.status === 301) {
        // Message({
        //   message: res.msg,
        //   type: 'warning',
        // });
        UserModule.FedLogOut().then(() => {
          if (router.currentRoute.path !== "/login") {
            router.push({
              path: "/login"/*,
              query: { redirect: router.currentRoute.fullPath }*/
            });
          }
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
