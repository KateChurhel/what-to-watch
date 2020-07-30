// libraries
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
        <Link className="logo" to="/">WTW</Link>
        <div className="page-header__menu-wrapper">
          <nav>
            <ul className="page-nav">
              <li className="page-nav__item">
                <Link className="page-nav__link" to={`/${CATEGORIES.movie}/1`}>Movies</Link>
              </li>
              <li className="page-nav__item">
                <Link className="page-nav__link" to={`/${CATEGORIES.tv}/1`}>TV Shows</Link>
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
