import { mapReduxState } from '../../assets/js/tools';
import { connect } from 'react-redux';
import { Menu } from '../../components/home/menu';
import { GetBookmarks } from '../../assets/js/api';
import { store } from '../../store/store';

const token = localStorage.getItem('access_token');

/**
 * * 获取书签列表
 */
async function getBookmarks() {
  let bookmarks = [];
  if (token) {
    bookmarks = await GetBookmarks();
  } else {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  }
  store.dispatch({ type: 'SET_BOOKMARKS', payload: bookmarks });
}

getBookmarks();

function mapStateToProps(state) {
  return mapReduxState(state, ['bookmarks']);
}

export const VisibleMenus = connect(mapStateToProps)(Menu);
