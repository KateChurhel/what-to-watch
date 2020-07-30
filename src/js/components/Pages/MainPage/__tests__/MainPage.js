import React from 'react';
import { render } from '@testing-library/react';
import MainPage from '../index';
import { MOCK_MOVIES, MOCK_TVS } from '../../../../mocks/movies';
import { formatCardData } from '../../../../helpers/formatData';

describe('Main Page: ', () => {
  it('correctly renders', async () => {
    const { asFragment } = render(
      <MainPage
        bigMovieCardData={formatCardData(MOCK_MOVIES[0])}
        mostPopularMovies={MOCK_MOVIES.slice(0, 2)}
        mostPopularTvs={MOCK_TVS.slice(0, 2)}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders without data', async () => {
    const { asFragment } = render(<MainPage />);

    expect(asFragment()).toMatchSnapshot();
  });
});
