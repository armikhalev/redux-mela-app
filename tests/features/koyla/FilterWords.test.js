import React from 'react';
import { shallow } from 'enzyme';
import { FilterWords } from '../../../src/features/koyla/FilterWords';

describe('koyla/FilterWords', () => {
  it('renders node with correct class name', () => {
    const props = {
      koyla: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <FilterWords {...props} />
    );

    expect(
      renderedComponent.find('.koyla-filter-words').length
    ).toBe(1);
  });
});
