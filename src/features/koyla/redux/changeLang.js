// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  KOYLA_CHANGE_LANG,
} from './constants';

export function changeLang() {
  return {
    type: KOYLA_CHANGE_LANG
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case KOYLA_CHANGE_LANG: {
      const curLang =
        state.curLang === 'English' ?
          'Mela':
          'English'
      ;
      return {
        ...state,
        curLang
      };
    }

    default:
      return state;
  }
}
