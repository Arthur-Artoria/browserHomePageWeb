import { mapReduxState } from '../../assets/js/tools';
import { connect } from 'react-redux';
import { Menu } from '../../components/home/menu';


function mapStateToProps(state) {
  return mapReduxState(state, ['bookmarks', 'token']);
}

function mapDispatchToProps(dispatch) {
  return {
    onInitBookmarks(bookmarks) {
      dispatch({ type: 'SET_BOOKMARKS', payload: bookmarks })
    }
  }
}

export const VisibleMenus = connect(mapStateToProps, mapDispatchToProps)(Menu);
