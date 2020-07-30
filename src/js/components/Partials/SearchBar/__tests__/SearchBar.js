import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SearchBar from '../index';

const mockPushHistory = jest.fn();

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockPushHistory,
  }),
}));

describe('Search Bar: ', () => {
  const closeMobileNav = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('correctly renders', () => {
    const wrapper = shallow(<SearchBar closeMobileNav={closeMobileNav} />);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('send form with data', async () => {
    const searchCategory = 'movie';
    const searchInput = 'Test';

    const wrapper = shallow(<SearchBar closeMobileNav={closeMobileNav} />);

    wrapper.find('input').simulate('change', { target: { value: 'Test' } });
    wrapper.find('select').simulate('change', { target: { value: 'movie' } });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(wrapper.find('input').props().value).toEqual(searchInput);
    expect(wrapper.find('select').props().value).toEqual(searchCategory);
    expect(mockPushHistory).toHaveBeenCalledWith(`/search/${searchCategory}/1/?query=${searchInput}`);
  });

  it('send form without data', async () => {
    const wrapper = shallow(<SearchBar closeMobileNav={closeMobileNav} />);

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(mockPushHistory).toHaveBeenCalledWith('/movie/1/');
  });
});
