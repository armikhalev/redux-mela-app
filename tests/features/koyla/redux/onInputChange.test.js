import {
  KOYLA_ON_INPUT_CHANGE,
} from '../../../../src/features/koyla/redux/constants';

import {
  onInputChange,
  reducer,
} from '../../../../src/features/koyla/redux/onInputChange';

describe('koyla/redux/onInputChange', () => {
  it('returns correct action by onInputChange', () => {
    expect(onInputChange()).toHaveProperty('type', KOYLA_ON_INPUT_CHANGE);
  });

  it('handles action type KOYLA_ON_INPUT_CHANGE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: KOYLA_ON_INPUT_CHANGE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
