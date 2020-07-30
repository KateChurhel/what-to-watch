import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { MOCK_MOVIES } from '../../../../mocks/movies';
import MovieTabCast from '../index';

describe('Movies Tab Cast: ', () => {
  it('correctly renders with data', () => {
    const tree = shallow(<MovieTabCast cast={MOCK_MOVIES[0].credits.cast} />);
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('correctly renders without data', () => {
    const tree = shallow(<MovieTabCast />);
    expect(toJSON(tree)).toMatchSnapshot();
  });
});
