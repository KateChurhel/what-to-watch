import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import BigMovieCard from '../index';
import { formatCardData } from '../../../../helpers/formatData';
import { MOCK_MOVIES } from '../../../../mocks/movies';

describe('Big Movie Card: ', () => {
  it('correctly renders with empty data', () => {
    const tree = shallow(<BigMovieCard />);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('correctly renders with card data', () => {
    const tree = shallow(<BigMovieCard {...formatCardData(MOCK_MOVIES[0])} />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
