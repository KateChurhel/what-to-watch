import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import MoviesCatalog from '../index';
import CATEGORIES from '../../../../constants/categories';
import ROUTES from '../../../../constants/routes';
import { MOCK_MOVIES } from '../../../../mocks/movies';

describe('Movies Catalog: ', () => {
  it('correctly renders with empty result', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}>
          <MoviesCatalog />
        </Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders with 1 result', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}>
          <MoviesCatalog catalogData={MOCK_MOVIES.slice(0, 3)} />
        </Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
