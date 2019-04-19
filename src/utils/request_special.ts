import axios from 'axios';
import qs from 'qs';
import { Message, MessageBox } from 'element-ui';
import { getToken } from '@/utils/auth';
import { UserModule } from '@/store/modules/user';
import config from '@/utils/config';
console.log(config);
const RequestSpecial = axios.create({
  // baseURL: process.env.VUE_APP_MOCK_API,
  baseURL: config.BaseUrlCustom,
  timeout: 5000,
});
axios.defaults.headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
};
// Request interceptors
RequestSpecial.interceptors.request.use(
  (config) => {
    return config;
  },

  (error) => {
    Promise.reject(error);
  },
);

// Response interceptors
RequestSpecial.interceptors.response.use(
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
      if (res.status === 300) {
        Message({
          message: res.msg,
          type: 'warning',
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

export default RequestSpecial;
