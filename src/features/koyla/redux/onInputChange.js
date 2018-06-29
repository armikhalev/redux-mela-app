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
    case KOYLA_ON_INPUT_CHANGE: {
      const { curLetter } = action;
      const { words, firstLetters } = state;

      /**
       * Check if needs more data from api by checking the first letter
       * if letter is in the firstLetters array, then it words starting with this letter already in the store
       * if not then add firstLetter to the store and call api for that letter
       */ 
      const isInFirstLetters = firstLetters
        .filter(x =>
          x === curLetter)
          .length > 0
      ;
      const _newFirstLetters =
        isInFirstLetters ?
          firstLetters:
          firstLetters.concat(curLetter)
      ;
      const newFirstLetters =
        curLetter.length === 1 ?
        _newFirstLetters:
        firstLetters
      ;

      // Find words by current input
      const visibleCards = words
        .filter(w =>
          w.attributes
            .word.includes(curLetter.toLowerCase()));

      return {
        ...state,
        visibleCards,
        firstLetters: newFirstLetters
      };
    }

    default:
      return state;
  }
}
