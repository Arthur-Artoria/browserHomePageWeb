import axios from 'axios';
import { message } from 'antd';

export const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
  timeout: 5000,
});

Axios.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  res => {
    const { status, data } = res;
    if ([200, 201].includes(status)) return Promise.resolve(data);
    return Promise.reject(res);
  },
  error => {
    const { response } = error;
    if (response) catchError(response);
    return Promise.reject(error);
  }
);

/**
 * * 对错误响应信息的处理
 * @param {object} response 错误响应信息
 */
function catchError(response) {
  const { status } = response;
  if (status === 401) unauthorized();
}

/**
 * * 登录过期处理
 */
function unauthorized() {
  const access_token = localStorage.getItem('access_token');
  message.warning(access_token ? '您的登录已过期，请重新登录！' : '请先登录！');
  localStorage.removeItem('access_token');
}
