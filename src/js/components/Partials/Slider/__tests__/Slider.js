import React from 'react';
import renderer from 'react-test-renderer';
import Slider from '../index';
import { MOCK_MOVIES } from '../../../../mocks/movies';

describe('Slider: ', () => {
  it('correctly renders', () => {
    const component = renderer.create(<Slider category="movie" items={MOCK_MOVIES.slice(0, 3)} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('correctly renders without data', () => {
    const component = renderer.create(<Slider category="movie" />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
