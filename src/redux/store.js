//@ts-check

import { createStore } from 'redux';
import { initAxiosAuth } from '../assets/js/api';

function reducer(state = {}, action) {
  const { bookmarks = [], photos = [] } = state;
  const { type, payload } = action;

  switch (type) {
    case 'PUSH_BOOKMARK':
      return Object.assign({}, state, { bookmarks: [...bookmarks, payload] })
    case 'SET_BOOKMARKS':
      return Object.assign({}, state, { bookmarks: [...payload] })
    case 'DELETE_BOOKMARK':
      return Object.assign({}, state, { bookmarks: bookmarks.filter(({ id }) => id !== payload) })
    case 'UPDATE_BOOKMARK':
      return {
        ...state, bookmarks: bookmarks.map(bookmark => Object.assign(bookmark, bookmark.id === payload.id && payload))
      }
    case 'SET_TOKEN':
      initAxiosAuth(payload)
      return { ...state, token: payload }

    case 'SET_PHOTOS':
      return { ...state, photos: payload }

    case 'PUSH_PHOTOS':
      return { ...state, photos: [...photos, payload] }

    case 'DELETE_PHOTO':
      return { ...state, photos: photos.filter(({ id }) => id !== payload) }

    default:
      return state;
  }
}

export const store = createStore(reducer, { bookmarks: [], photos: [], token: localStorage.getItem('access_token') });