import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '../../../src/features/koyla';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Card />);
  expect(renderedComponent.find('.koyla-card').length).toBe(1);
});
