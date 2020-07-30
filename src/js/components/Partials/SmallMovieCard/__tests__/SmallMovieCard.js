import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SmallMovieCard from '../index';

const MOCK_DATA = {
  cardTitle: 'Title',
  link: '/link',
};

describe('Small Movie Card: ', () => {
  it('correctly renders with data', () => {
    const tree = shallow(<SmallMovieCard {...MOCK_DATA} poster="/poster.jpg" />);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('correctly renders without poster', () => {
    const tree = shallow(<SmallMovieCard {...MOCK_DATA} />);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('correctly renders without data', () => {
    const tree = shallow(<SmallMovieCard />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
