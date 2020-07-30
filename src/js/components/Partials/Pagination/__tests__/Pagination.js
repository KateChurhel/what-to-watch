import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import renderer from 'react-test-renderer';
import Pagination from '../index';

describe('Pagination: ', () => {
  it('correctly renders', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={['/movie/2']} initialIndex={1}>
        <Route path="/:category/:page">
          <Pagination totalPages={10} />
        </Route>
      </MemoryRouter>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('correctly renders with active element in the end of pagination', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={['/movie/8']} initialIndex={1}>
        <Route path="/:category/:page">
          <Pagination totalPages={10} />
        </Route>
      </MemoryRouter>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('correctly renders with active element in the center of pagination', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={['/movie/8']} initialIndex={1}>
        <Route path="/:category/:page">
          <Pagination totalPages={15} />
        </Route>
      </MemoryRouter>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  it('correctly renders without ellipses', () => {
    const component = renderer.create(
      <MemoryRouter initialEntries={['/movie/3']} initialIndex={1}>
        <Route path="/:category/:page">
          <Pagination totalPages={3} />
        </Route>
      </MemoryRouter>,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
