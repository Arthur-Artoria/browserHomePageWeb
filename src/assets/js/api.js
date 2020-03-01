import { Axios as axios } from './axios';

/**
 * * 登录
 * @param {string} account 用户账号 
 * @param {string} password 用户密码 
 */
export function Login(account, password) {
  return axios.post('/auth/login', {
    password,
    username: account
  })
}