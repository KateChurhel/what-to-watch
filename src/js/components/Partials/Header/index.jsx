// libraries
import React, { useState } from 'react';
// views
import SearchBar from '../SearchBar';
// constants
import CATEGORIES from '../../../constants/categories';

const Header = () => {
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);

  const closeMobileNav = () => {
    setIsMobileNavOpened(false);
    document.body.classList.remove('nav-mobile-scroll-lock');
  };

  const clickHamburgerButton = () => {
    if (isMobileNavOpened) {
      closeMobileNav();
    } else {
      setIsMobileNavOpened(true);
      document.body.classList.add('nav-mobile-scroll-lock');
    }
  };

  return (
    <header className={`page-header ${isMobileNavOpened ? 'page-header__show-menu' : ''}`}>
      <div className="container">
        <a className="logo" href="/">WTW</a>
        <div className="page-header__menu-wrapper">
          <nav>
            <ul className="page-nav">
              <li className="page-nav__item">
                <a className="page-nav__link" href={`/${CATEGORIES.movie}/1`}>Movies</a>
              </li>
              <li className="page-nav__item">
                <a className="page-nav__link" href={`/${CATEGORIES.tv}/1`}>TV Shows</a>
              </li>
            </ul>
          </nav>
          <SearchBar closeMobileNav={closeMobileNav} />
        </div>
        <button className="page-nav__hamburger-button" onClick={clickHamburgerButton} type="button">
          <span />
        </button>
      </div>
    </header>
  );
};

export default Header;
