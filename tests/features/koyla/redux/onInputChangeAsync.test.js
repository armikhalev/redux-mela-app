import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  KOYLA_ON_INPUT_CHANGE_ASYNC_BEGIN,
  KOYLA_ON_INPUT_CHANGE_ASYNC_SUCCESS,
  KOYLA_ON_INPUT_CHANGE_ASYNC_FAILURE,
  KOYLA_ON_INPUT_CHANGE_ASYNC_DISMISS_ERROR,
} from '../../../../src/features/koyla/redux/constants';

import {
  onInputChangeAsync,
  dismissOnInputChangeAsyncError,
  reducer,
} from '../../../../src/features/koyla/redux/onInputChangeAsync';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('koyla/redux/onInputChangeAsync', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when onInputChangeAsync succeeds', () => {
    const store = mockStore({});

    return store.dispatch(onInputChangeAsync())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', KOYLA_ON_INPUT_CHANGE_ASYNC_BEGIN);
        expect(actions[1]).toHaveProperty('type', KOYLA_ON_INPUT_CHANGE_ASYNC_SUCCESS);
      });
  });

  it('dispatches failure action when onInputChangeAsync fails', () => {
    const store = mockStore({});

    return store.dispatch(onInputChangeAsync({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', KOYLA_ON_INPUT_CHANGE_ASYNC_BEGIN);
        expect(actions[1]).toHaveProperty('type', KOYLA_ON_INPUT_CHANGE_ASYNC_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissOnInputChangeAsyncError', () => {
    const expectedAction = {
      type: KOYLA_ON_INPUT_CHANGE_ASYNC_DISMISS_ERROR,
    };
    expect(dismissOnInputChangeAsyncError()).toEqual(expectedAction);
  });

  it('handles action type KOYLA_ON_INPUT_CHANGE_ASYNC_BEGIN correctly', () => {
    const prevState = { onInputChangeAsyncPending: false };
    const state = reducer(
      prevState,
      { type: KOYLA_ON_INPUT_CHANGE_ASYNC_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.onInputChangeAsyncPending).toBe(true);
  });

  it('handles action type KOYLA_ON_INPUT_CHANGE_ASYNC_SUCCESS correctly', () => {
    const prevState = { onInputChangeAsyncPending: true };
    const state = reducer(
      prevState,
      { type: KOYLA_ON_INPUT_CHANGE_ASYNC_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.onInputChangeAsyncPending).toBe(false);
  });

  it('handles action type KOYLA_ON_INPUT_CHANGE_ASYNC_FAILURE correctly', () => {
    const prevState = { onInputChangeAsyncPending: true };
    const state = reducer(
      prevState,
      { type: KOYLA_ON_INPUT_CHANGE_ASYNC_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.onInputChangeAsyncPending).toBe(false);
    expect(state.onInputChangeAsyncError).toEqual(expect.anything());
  });

  it('handles action type KOYLA_ON_INPUT_CHANGE_ASYNC_DISMISS_ERROR correctly', () => {
    const prevState = { onInputChangeAsyncError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: KOYLA_ON_INPUT_CHANGE_ASYNC_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.onInputChangeAsyncError).toBe(null);
  });
});

