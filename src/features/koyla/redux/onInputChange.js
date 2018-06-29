// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  KOYLA_ON_INPUT_CHANGE,
} from './constants';

export function onInputChange(curLetter) {
  return {
    type: KOYLA_ON_INPUT_CHANGE,
    curLetter
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case KOYLA_ON_INPUT_CHANGE:
    {
      const { curLetter } = action;
      const { words } = state;
      const visibleCards = words
        .filter(w =>
          w.attributes
            .word.includes(curLetter.toLowerCase()));

      return {
        ...state,
        visibleCards
      };
    }

    default:
      return state;
  }
}
