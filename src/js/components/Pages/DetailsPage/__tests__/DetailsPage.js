import React from 'react';
import { act, render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import DetailsPage from '../index';
import CATEGORIES, { MOVIE_TABS } from '../../../../constants/categories';
import ROUTES from '../../../../constants/routes';
import { MOCK_MOVIES } from '../../../../mocks/movies';
import { formatCardData } from '../../../../helpers/formatData';

describe('Details Page: ', () => {
  it('correctly renders', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/details/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.detailsPage}>
          <DetailsPage {...formatCardData(MOCK_MOVIES[0])} />
        </Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('correctly renders with empty result', async () => {
    const { asFragment } = render(
      <MemoryRouter initialEntries={[`/details/${CATEGORIES.movie}/1`]} initialIndex={1}>
        <Route path={ROUTES.detailsPage}>
          <DetailsPage />
        </Route>
      </MemoryRouter>,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  describe('', () => {
    let wrapper;

    beforeEach(async () => {
      await act(async () => {
        wrapper = await mount(<MemoryRouter initialEntries={[`/details/${CATEGORIES.movie}/1`]} initialIndex={1}>
          <Route path={ROUTES.detailsPage}>
            <DetailsPage {...formatCardData(MOCK_MOVIES[0])} />
          </Route>
                              </MemoryRouter>);
      });
      wrapper.update();
    });

    it('open details tab', async () => {
      const link = wrapper.findWhere((node) => (
        node.name() === 'button'
          && node.text() === MOVIE_TABS.DETAILS
      ));
      link.simulate('click');
      expect(wrapper.find('.movie-nav__item--active button').props().children).toEqual(MOVIE_TABS.DETAILS);
    });

    it('open reviews tab', async () => {
      const link = wrapper.findWhere((node) => (
        node.name() === 'button'
          && node.text() === MOVIE_TABS.REVIEWS
      ));
      link.simulate('click');
      expect(wrapper.find('.movie-nav__item--active button').props().children).toEqual(MOVIE_TABS.REVIEWS);
    });

    it('open cast tab', async () => {
      const link = wrapper.findWhere((node) => (
        node.name() === 'button'
          && node.text() === MOVIE_TABS.CAST
      ));
      link.simulate('click');
      expect(wrapper.find('.movie-nav__item--active button').props().children).toEqual(MOVIE_TABS.CAST);
    });
  });
});
