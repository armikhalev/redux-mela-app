import React from 'react';
import { shallow } from 'enzyme';
import { Main } from '../../../src/features/koyla/Main';

describe('koyla/Main', () => {
  it('renders node with correct class name', () => {
    const props = {
      koyla: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Main {...props} />
    );

    expect(
      renderedComponent.find('.koyla-main').length
    ).toBe(1);
  });
});
