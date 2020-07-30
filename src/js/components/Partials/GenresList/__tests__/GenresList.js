import React from 'react';
import { act, render } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { waitForElement } from '@testing-library/dom';
import GenresList from '../index';
import { getGenres } from '../../../../api/movies';
import { MOCK_GENRES } from '../../../../mocks/movies';
import { addActiveGenre, removeActiveGenre, clearActiveGenres } from '../../../../actions/genres';
import CATEGORIES from '../../../../constants/categories';
import ROUTES from '../../../../constants/routes';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

jest.mock('../../../../api/movies');
jest.mock('../../../../actions/genres', () => ({
  addActiveGenre: jest.fn(),
  removeActiveGenre: jest.fn(),
  clearActiveGenres: jest.fn(),
}));

describe('Genres List: ', () => {
  let wrapper;

  beforeAll(() => {
    getGenres.mockReturnValue({ genres: MOCK_GENRES });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('correctly renders', async () => {
    useSelector.mockImplementation((selectorFn) => selectorFn({ genres: { activeGenres: [] } }));

    const { asFragment, getByText } = render(
      <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.catalog}>
          <GenresList />
        </Route>
      </MemoryRouter>,
    );

    await waitForElement(() => getByText('All Genres'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders with active value "All Genres"', async () => {
    useSelector.mockImplementation((selectorFn) => selectorFn({ genres: { activeGenres: [] } }));

    await act(async () => {
      wrapper = await mount(
        <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
          <Route path={ROUTES.catalog}>
            <GenresList />
          </Route>
        </MemoryRouter>,
      );
    });
    wrapper.update();

    expect(wrapper.find('.catalog__genres-item--active .catalog__genres-link').text()).toEqual('All Genres');
  });

  it('correctly renders with active filter value', async () => {
    useSelector.mockImplementation((selectorFn) => selectorFn({ genres: { activeGenres: [MOCK_GENRES[0].id] } }));

    await act(async () => {
      wrapper = await mount(
        <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
          <Route path={ROUTES.catalog}>
            <GenresList />
          </Route>
        </MemoryRouter>,
      );
    });
    wrapper.update();

    expect(wrapper.find('.catalog__genres-item--active .catalog__genres-link').text()).toEqual(MOCK_GENRES[0].name);
  });

  it('correctly renders with several active filter values', async () => {
    const activeGenres = [MOCK_GENRES[0].id, MOCK_GENRES[1].id];
    useSelector.mockImplementation((selectorFn) => selectorFn({ genres: { activeGenres } }));

    await act(async () => {
      wrapper = await mount(
        <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
          <Route path={ROUTES.catalog}>
            <GenresList />
          </Route>
        </MemoryRouter>,
      );
    });
    wrapper.update();

    expect(wrapper.find('.catalog__genres-item--active .catalog__genres-link').length).toEqual(activeGenres.length);
  });

  describe('', () => {
    beforeEach(async () => {
      useSelector.mockImplementation((selectorFn) => selectorFn({ genres: { activeGenres: [MOCK_GENRES[0].id] } }));

      await act(async () => {
        wrapper = await mount(
          <MemoryRouter initialEntries={[`/${CATEGORIES.movie}/1`]} initialIndex={1}>
            <Route path={ROUTES.catalog}>
              <GenresList />
            </Route>
          </MemoryRouter>,
        );
      });
      wrapper.update();
    });

    it('click on inactive link', async () => {
      const link = wrapper.findWhere((node) => (
        node.name() === 'a'
          && node.text() === MOCK_GENRES[2].name
      ));
      link.simulate('click');
      expect(addActiveGenre).toHaveBeenCalled();
    });

    it('click on active link', async () => {
      const link = wrapper.find('.catalog__genres-item--active .catalog__genres-link');
      link.simulate('click');
      expect(removeActiveGenre).toHaveBeenCalled();
    });

    it('click on "All Genres" link', async () => {
      const link = wrapper.findWhere((node) => (
        node.name() === 'a'
          && node.text() === 'All Genres'
      ));
      link.simulate('click');
      expect(clearActiveGenres).toHaveBeenCalled();
    });
  });
});
