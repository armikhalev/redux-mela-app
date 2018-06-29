import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  KOYLA_GET_WORDS_BEGIN,
  KOYLA_GET_WORDS_SUCCESS,
  KOYLA_GET_WORDS_FAILURE,
  KOYLA_GET_WORDS_DISMISS_ERROR,
} from '../../../../src/features/koyla/redux/constants';

import {
  getWords,
  dismissGetWordsError,
  reducer,
} from '../../../../src/features/koyla/redux/getWords';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('koyla/redux/getWords', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when getWords succeeds', () => {
    const store = mockStore({});

    return store.dispatch(getWords())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', KOYLA_GET_WORDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', KOYLA_GET_WORDS_SUCCESS);
      });
  });

  it('dispatches failure action when getWords fails', () => {
    const store = mockStore({});

    return store.dispatch(getWords({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', KOYLA_GET_WORDS_BEGIN);
        expect(actions[1]).toHaveProperty('type', KOYLA_GET_WORDS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGetWordsError', () => {
    const expectedAction = {
      type: KOYLA_GET_WORDS_DISMISS_ERROR,
    };
    expect(dismissGetWordsError()).toEqual(expectedAction);
  });

  it('handles action type KOYLA_GET_WORDS_BEGIN correctly', () => {
    const prevState = { getWordsPending: false };
    const state = reducer(
      prevState,
      { type: KOYLA_GET_WORDS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWordsPending).toBe(true);
  });

  it('handles action type KOYLA_GET_WORDS_SUCCESS correctly', () => {
    const prevState = { getWordsPending: true };
    const state = reducer(
      prevState,
      { type: KOYLA_GET_WORDS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWordsPending).toBe(false);
  });

  it('handles action type KOYLA_GET_WORDS_FAILURE correctly', () => {
    const prevState = { getWordsPending: true };
    const state = reducer(
      prevState,
      { type: KOYLA_GET_WORDS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWordsPending).toBe(false);
    expect(state.getWordsError).toEqual(expect.anything());
  });

  it('handles action type KOYLA_GET_WORDS_DISMISS_ERROR correctly', () => {
    const prevState = { getWordsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: KOYLA_GET_WORDS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.getWordsError).toBe(null);
  });
});

