import React from 'react';
import { shallow } from 'enzyme';
import { Card } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Card />);
  expect(renderedComponent.find('.home-card').length).toBe(1);
});
