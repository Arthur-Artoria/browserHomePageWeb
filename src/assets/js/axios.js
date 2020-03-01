import axios from 'axios';

export const Axios = axios.create({
  baseURL: `${process.env.REACT_APP_API_HOST}`,
  timeout: 0
});

Axios.interceptors.request.use(
  config => config,
  error => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  res => {
    const { code = 200, msg, message } = res.data;
    if (code !== 200) {
      return Promise.reject(res);
    }
    return Promise.resolve(res);
  },
  error => {
    return Promise.reject(error);
  }
);
