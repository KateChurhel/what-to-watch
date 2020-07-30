import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import MovieTabOverview from '../index';

const MOCK_DATA = {
  voteAverage: 7.3,
  voteCount: 10,
  overview: 'Test Overview',
};

describe('Movies Tab Overview: ', () => {
  it('correctly renders with data', () => {
    const tree = shallow(<MovieTabOverview {...MOCK_DATA} />);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('correctly renders without data', () => {
    const tree = shallow(<MovieTabOverview />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
