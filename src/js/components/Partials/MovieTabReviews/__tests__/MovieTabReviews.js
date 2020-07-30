import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MOCK_MOVIES } from '../../../../mocks/movies';
import MovieTabReviews from '../index';

describe('Movies Tab Reviews: ', () => {
  it('correctly renders with data', () => {
    const tree = shallow(<MovieTabReviews reviews={MOCK_MOVIES[0].reviews.results} />);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('correctly renders without data', () => {
    const tree = shallow(<MovieTabReviews />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
