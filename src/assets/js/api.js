import { Axios as axios } from './axios';

const AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

/**
 * * 登录
 * @param {string} username 用户账号 
 * @param {string} password 用户密码 
 */
export function Login(username, password) {
  return axios.post('/auth/login', { username, password })
}

/**
 * * 获取身份信息
 * @param {number} id 用户id 
 */
export function GetProfile(id = '') {
  return axios.get(`profile/${id}`)
}

/**
 * * 获取书签列表
 */
export function GetBookmarks() {
  return axios.get('bookmarks')
}

/**
 * * 保存书签
 * @param {object} bookmark 待保存的书签数据
 */
export function SaveBookmark(bookmark) {
  return axios.post('bookmarks', bookmark)
}

/**
 * * 删除书签
 * @param {number} id 书签id
 */
export function DeleteBookmark(id) {
  return axios.delete(`bookmarks/${id}`);
}