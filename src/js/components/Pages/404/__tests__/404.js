import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import PageNotFound from '../index';

it('Page Not Found (404) correctly renders', () => {
  const tree = shallow(<PageNotFound />);
  expect(toJSON(tree)).toMatchSnapshot();
});
