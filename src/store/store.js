import { createStore } from 'redux';

function reducer(state = { bookmarks: [] }, action) {
  const { bookmarks } = state;
  const { type, payload } = action;

  switch (type) {
    case 'PUSH_BOOKMARK':
      return Object.assign({}, state, { bookmarks: [...bookmarks, payload] })
    case 'SET_BOOKMARKS':
      return Object.assign({}, state, { bookmarks: [...payload] })
    case 'DELETE_BOOKMARK':
      return Object.assign({}, state, { bookmarks: bookmarks.filter(({ id }) => id !== payload) })
    default:
      return state;
  }
}

export const store = createStore(reducer);