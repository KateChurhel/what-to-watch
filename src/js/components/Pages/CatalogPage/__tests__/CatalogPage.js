import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CatalogPage from '../index';
import CATEGORIES from '../../../../constants/categories';
import ROUTES from '../../../../constants/routes';
import { MOCK_MOVIES } from '../../../../mocks/movies';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const mockData = {
  emptyResult: {
    total_pages: 0,
    total_results: 0,
  },
  withCatalogData: {
    total_pages: 1,
    total_results: 1,
    results: [MOCK_MOVIES[0]],
    isGenresFilterShown: false,
  },
  withFilterAndPagination: {
    total_pages: 2,
    total_results: 1,
    results: MOCK_MOVIES.slice(0, 3),
    isGenresFilterShown: true,
  },
};

describe('Catalog Page: ', () => {
  it('correctly renders with empty result', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}><CatalogPage {...mockData.emptyResult} /></Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders with 1 result', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}><CatalogPage {...mockData.withCatalogData} /></Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders with filter and pagination', async () => {
    useSelector.mockImplementation((selectorFn) => selectorFn({ genres: { activeGenres: [] } }));

    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/${CATEGORIES.tv}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}><CatalogPage {...mockData.withFilterAndPagination} /></Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders with empty search result', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/search/${CATEGORIES.tv}/1?query=test`]} initialIndex={1}>
        <Route path={ROUTES.search}><CatalogPage {...mockData.emptyResult} /></Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders with search result', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/search/${CATEGORIES.movie}/1?query=test`]} initialIndex={1}>
        <Route path={ROUTES.search}><CatalogPage {...mockData.withCatalogData} /></Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
