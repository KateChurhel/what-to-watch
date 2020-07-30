import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Loader from '../index';

describe('Loader: ', () => {
  it('correctly renders with loader', () => {
    const tree = shallow(<Loader isActive>Test content</Loader>);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('correctly renders without loader', () => {
    const tree = shallow(<Loader>Test content</Loader>);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
