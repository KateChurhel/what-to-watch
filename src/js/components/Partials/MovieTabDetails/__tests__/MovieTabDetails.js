import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import CATEGORIES from '../../../../constants/categories';
import ROUTES from '../../../../constants/routes';
import { MOCK_MOVIES, MOCK_TVS } from '../../../../mocks/movies';
import MovieTabDetails from '../index';
import { formatCardData } from '../../../../helpers/formatData';

describe('Movies Tab Details: ', () => {
  it('correctly renders with movie data', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}>
          <MovieTabDetails {...formatCardData(MOCK_MOVIES[0])} />
        </Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders with tv data', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/${CATEGORIES.tv}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}>
          <MovieTabDetails {...formatCardData(MOCK_TVS[0])} />
        </Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders without data', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}>
          <MovieTabDetails />
        </Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
