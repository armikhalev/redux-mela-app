import axios from 'axios';

import {
  KOYLA_ON_INPUT_CHANGE_ASYNC_BEGIN,
  KOYLA_ON_INPUT_CHANGE_ASYNC_SUCCESS,
  KOYLA_ON_INPUT_CHANGE_ASYNC_FAILURE,
  KOYLA_ON_INPUT_CHANGE_ASYNC_DISMISS_ERROR,
  KOYLA_ON_INPUT_CHANGE_ASYNC_FOUND_CARD,
  KOYLA_ON_INPUT_CHANGE_ASYNC_ADD_FIRST_LETTER
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function onInputChangeAsync(letter) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    const { koyla: { words, firstLetters, curLang } } = getState();

    dispatch({
      type: KOYLA_ON_INPUT_CHANGE_ASYNC_BEGIN,
    });

    /**
     * Check if needs more data from api by checking the first letter
     * if letter is in the firstLetters array, then it words starting with this letter already in the store
     * if not then add firstLetter to the store and call api for that letter
     */
    const isInFirstLetters = firstLetters
      .filter(x =>
        x === letter)
      .length > 0
    ;
    const _newFirstLetters =
      isInFirstLetters ?
        firstLetters :
        firstLetters.concat(letter)
    ;
    const newFirstLetters =
      letter.length === 1 ?
        _newFirstLetters :
        firstLetters
    ;

    // Find words by current input
    const visibleCards = words
      .filter(w =>
        w.attributes
          .word.includes(letter.toLowerCase()))
    ;

    dispatch({
      type: KOYLA_ON_INPUT_CHANGE_ASYNC_FOUND_CARD,
      visibleCards
    });

    if (!isInFirstLetters && letter !== '' && letter.length === 1) {
      dispatch({
        type: KOYLA_ON_INPUT_CHANGE_ASYNC_ADD_FIRST_LETTER,
        newFirstLetters
      });

      // Return a promise so that you could control UI flow without states in the store.
      // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
      // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
      // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
      const promise = new Promise((resolve, reject) => {
        // doRequest is a placeholder Promise. You should replace it with your own logic.
        // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
        // args.error here is only for test coverage purpose.

        const _curLang =
          curLang === 'English'?
            'words':
            'las'
        ;
        const doRequest = axios.get('http://melasi.pythonanywhere.com/koyla/' + _curLang + '/?letter=' + letter);

        doRequest.then(
          (res) => {

            dispatch({
              type: KOYLA_ON_INPUT_CHANGE_ASYNC_SUCCESS,
              data: res.data,
            });

            dispatch({
              type: KOYLA_ON_INPUT_CHANGE_ASYNC_FOUND_CARD,
              visibleCards
            });

            resolve(res);
          },
          // Use rejectHandler as the second argument so that render errors won't be caught.
          (err) => {
            dispatch({
              type: KOYLA_ON_INPUT_CHANGE_ASYNC_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
      });

      return promise;
    }
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissOnInputChangeAsyncError() {
  return {
    type: KOYLA_ON_INPUT_CHANGE_ASYNC_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case KOYLA_ON_INPUT_CHANGE_ASYNC_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        onInputChangeAsyncPending: true,
        onInputChangeAsyncError: null,
      };

    case KOYLA_ON_INPUT_CHANGE_ASYNC_SUCCESS: {
      const { data } = action.data;
      const { words } = state;

      const newWords = words.concat(data);

      return {
        ...state,
        words: newWords, // TODO: what should differ?
        visibleCards: newWords,
        onInputChangeAsyncPending: false,
        onInputChangeAsyncError: null,
      };
    }

    case KOYLA_ON_INPUT_CHANGE_ASYNC_FAILURE:
      // The request is failed
      return {
        ...state,
        onInputChangeAsyncPending: false,
        onInputChangeAsyncError: action.data.error,
      };

    case KOYLA_ON_INPUT_CHANGE_ASYNC_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        onInputChangeAsyncError: null,
      };

    case KOYLA_ON_INPUT_CHANGE_ASYNC_FOUND_CARD: {

      const { visibleCards } = action;

      return {
        ...state,
        visibleCards
      };
    }

    case KOYLA_ON_INPUT_CHANGE_ASYNC_ADD_FIRST_LETTER: {

      const { newFirstLetters } = action;

      return {
        ...state,
        firstLetters: newFirstLetters
      };
    }

    default:
      return state;
  }
}
