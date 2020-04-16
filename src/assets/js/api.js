import { Axios as axios } from './axios';

initAxiosAuth();

/**
 * * 初始化身份凭证
 * @param {string} AUTH_TOKEN 身份凭证
 */
export function initAxiosAuth(AUTH_TOKEN) {
  AUTH_TOKEN = `Bearer ${localStorage.getItem('access_token')}`;
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}

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

/**
 * * 更新书签数据
 * @param {number} id 待更新书签id
 * @param {Object} updateBookmarkDto 待更新书签数据
 */
export function UpdateBookmark(id, updateBookmarkDto) {
  return axios.put(`bookmarks/${id}`, updateBookmarkDto)
}

/**
 * * 获取图片列表
 */
export function GetPhotos() {
  return axios.get('photos');
}

export function GetBingPhotos() {
  return axios.get('photos/bing')
}

/**
 * * 保存背景图片
 * @param {string} name photo oss 名称
 */
export function SavePhoto(name) {
  return axios.post(`photos`, { name })
}

/**
 * * 删除背景图片
 * @param {number} id 背景图片id
 */
export function DeletePhoto(id) {
  return axios.delete(`photos/${id}`);
}
