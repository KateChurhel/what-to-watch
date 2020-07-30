import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Header from '../index';

describe('Header: ', () => {
  const tree = shallow(<Header />);

  it('correctly renders', () => {
    expect(toJSON(tree)).toMatchSnapshot();
  });

  it('open mobile menu', () => {
    tree.find('.page-nav__hamburger-button').simulate('click');
    expect(toJSON(tree)).toMatchSnapshot();
    expect(tree.find('.page-header.page-header__show-menu').exists()).toEqual(true);
  });

  it('close mobile menu', () => {
    const button = tree.find('.page-nav__hamburger-button').simulate('click');
    button.simulate('click');
    button.simulate('click');
    expect(tree.find('.page-header.page-header__show-menu').exists()).toEqual(false);
  });
});
