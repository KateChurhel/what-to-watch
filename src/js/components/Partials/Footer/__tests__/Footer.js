import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Footer from '../index';

it('Footer correctly renders', () => {
  const tree = shallow(<Footer />);
  expect(toJSON(tree)).toMatchSnapshot();
});
