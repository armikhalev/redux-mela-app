import {
  KOYLA_CHANGE_LANG,
} from '../../../../src/features/koyla/redux/constants';

import {
  changeLang,
  reducer,
} from '../../../../src/features/koyla/redux/changeLang';

describe('koyla/redux/changeLang', () => {
  it('returns correct action by changeLang', () => {
    expect(changeLang()).toHaveProperty('type', KOYLA_CHANGE_LANG);
  });

  it('handles action type KOYLA_CHANGE_LANG correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: KOYLA_CHANGE_LANG }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
