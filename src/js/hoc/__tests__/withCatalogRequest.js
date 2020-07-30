import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { act } from '@testing-library/react';
import { mount } from 'enzyme';
import { useSelector } from 'react-redux';
import withCatalogRequest from '../withCatalogRequest';
import {
  getCategoryData, getDetailsData, getSearchResult, getDiscoverResult,
} from '../../api/movies';
import { formatCardData } from '../../helpers/formatData';
import { MOCK_MOVIES, MOCK_TVS } from '../../mocks/movies';
import ROUTES from '../../constants/routes';
import CATEGORIES from '../../constants/categories';

window.scrollTo = jest.fn();

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));
jest.mock('../../api/movies');

describe('withCatalogRequest test:', () => {
  let wrapper;
  const mockComponent = () => (<div />);
  const WrappedMockComponent = withCatalogRequest(mockComponent);

  beforeEach(async () => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.012);
    getCategoryData.mockImplementation((category) => (category === 'movie' ? { results: MOCK_MOVIES } : { results: MOCK_TVS }));
    getDetailsData.mockReturnValue(MOCK_MOVIES[0]);
    getSearchResult.mockReturnValue({ total_pages: 1, total_results: 1, results: [MOCK_MOVIES[0]] });
    getDiscoverResult.mockReturnValue({});
    useSelector.mockImplementation((selectorFn) => selectorFn({ genres: {} }));
  });

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore();
    useSelector.mockClear();
    jest.clearAllMocks();
  });

  it('get correct data for route "/"', async () => {
    await act(async () => {
      wrapper = await mount(<MemoryRouter initialEntries={['/']} initialIndex={1}>
        <Route path={ROUTES.mainPage}>
          <WrappedMockComponent />
        </Route>
      </MemoryRouter>);
    });
    wrapper.update();

    expect(wrapper.find(mockComponent).props()).toEqual({
      mostPopularMovies: MOCK_MOVIES,
      mostPopularTvs: MOCK_TVS,
      bigMovieCardData: formatCardData(MOCK_MOVIES[0]),
    });
  });

  it('get empty data for route "/"', async () => {
    getCategoryData.mockImplementation(() => ({}));
    getDetailsData.mockReturnValue({});

    await act(async () => {
      wrapper = await mount(<MemoryRouter initialEntries={['/']} initialIndex={1}>
        <Route path={ROUTES.mainPage}>
          <WrappedMockComponent />
        </Route>
      </MemoryRouter>);
    });
    wrapper.update();

    expect(wrapper.find(mockComponent).props()).toEqual({
      mostPopularMovies: [],
      mostPopularTvs: [],
      bigMovieCardData: formatCardData({}),
    });
  });

  it('get correct data for movie details', async () => {
    await act(async () => {
      wrapper = await mount(<MemoryRouter initialEntries={[`/details/${CATEGORIES.movie}/${MOCK_MOVIES[0].id}`]} initialIndex={1}>
        <Route path={ROUTES.detailsPage}>
          <WrappedMockComponent />
        </Route>
      </MemoryRouter>);
    });
    wrapper.update();

    expect(wrapper.find(mockComponent).props()).toEqual(formatCardData(MOCK_MOVIES[0]));
  });

  it('get empty data for movie details', async () => {
    getDetailsData.mockReturnValue({});

    await act(async () => {
      wrapper = await mount(<MemoryRouter initialEntries={[`/details/${CATEGORIES.tv}/${MOCK_MOVIES[0].id}`]} initialIndex={1}>
        <Route path={ROUTES.detailsPage}>
          <WrappedMockComponent />
        </Route>
      </MemoryRouter>);
    });
    wrapper.update();

    expect(wrapper.find(mockComponent).props()).toEqual(formatCardData({}));
  });

  it('get correct data for search', async () => {
    await act(async () => {
      wrapper = await mount(<MemoryRouter initialEntries={[`/search/${CATEGORIES.movie}/1?query=test`]} initialIndex={1}>
        <Route path={ROUTES.search}>
          <WrappedMockComponent />
        </Route>
      </MemoryRouter>);
    });
    wrapper.update();

    expect(wrapper.find(mockComponent).props()).toEqual({ total_pages: 1, total_results: 1, results: [MOCK_MOVIES[0]] });
  });

  it('get empty data for search', async () => {
    getSearchResult.mockReturnValue({ total_pages: 0, total_results: 0, results: [] });

    await act(async () => {
      wrapper = await mount(<MemoryRouter initialEntries={[`/search/${CATEGORIES.tv}/1?query=test`]} initialIndex={1}>
        <Route path={ROUTES.search}>
          <WrappedMockComponent />
        </Route>
      </MemoryRouter>);
    });
    wrapper.update();

    expect(wrapper.find(mockComponent).props()).toEqual({ total_pages: 0, total_results: 0, results: [] });
  });

  it('get correct data for catalog', async () => {
    const mockData = { total_pages: 1, total_results: 2, results: [MOCK_MOVIES[0]] };
    getCategoryData.mockImplementation(() => mockData);

    await act(async () => {
      wrapper = await mount(<MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}>
          <WrappedMockComponent />
        </Route>
      </MemoryRouter>);
    });
    wrapper.update();

    expect(wrapper.find(mockComponent).props()).toEqual({ ...mockData, isGenresFilterShown: true });
  });

  it('get empty data for catalog', async () => {
    const mockData = {};
    getCategoryData.mockImplementation(() => mockData);

    await act(async () => {
      wrapper = await mount(<MemoryRouter initialEntries={[`/${CATEGORIES.tv}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}>
          <WrappedMockComponent />
        </Route>
      </MemoryRouter>);
    });
    wrapper.update();

    expect(wrapper.find(mockComponent).props()).toEqual({ ...mockData, isGenresFilterShown: false });
  });

  it('get error', async () => {
    const mockErrorMessage = 'Request Error';
    getCategoryData.mockImplementation(() => {
      throw new Error(mockErrorMessage);
    });

    await act(async () => {
      wrapper = await mount(<MemoryRouter initialEntries={[`/${CATEGORIES.tv}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}>
          <WrappedMockComponent />
        </Route>
      </MemoryRouter>);
    });
    wrapper.update();

    expect(wrapper.find('.message').text()).toEqual(mockErrorMessage);
  });
});
