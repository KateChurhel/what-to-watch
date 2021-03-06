// libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
// constants
import CATEGORIES from '../../../constants/categories';

const SearchBar = ({ closeMobileNav }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchCategory, setSearchCategory] = useState('movie');
  const history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    closeMobileNav();

    if (searchInput) {
      history.push(`/search/${searchCategory}/1/?query=${searchInput}`);
    } else {
      history.push(`/${searchCategory}/1/`);
    }
  };

  return (
    <div className="search-bar">
      <form className="search-bar__form" onSubmit={submitHandler}>
        <select
          onChange={({ target: { value } }) => setSearchCategory(value)}
          value={searchCategory}
        >
          <option value={CATEGORIES.movie}>Movie</option>
          <option value={CATEGORIES.tv}>TV</option>
        </select>
        <input
          className="search-bar__input"
          onChange={({ target: { value } }) => setSearchInput(value)}
          type="text"
          value={searchInput}
        />
        <button className="search-bar__button" type="submit">
          <svg height="20" viewBox="0 0 512.005 512.005" width="20" xmlns="http://www.w3.org/2000/svg">
            {/* eslint-disable-next-line max-len */}
            <path d="M505.749,475.587l-145.6-145.6c28.203-34.837,45.184-79.104,45.184-127.317c0-111.744-90.923-202.667-202.667-202.667 S0,90.925,0,202.669s90.923,202.667,202.667,202.667c48.213,0,92.48-16.981,127.317-45.184l145.6,145.6 c4.16,4.16,9.621,6.251,15.083,6.251s10.923-2.091,15.083-6.251C514.091,497.411,514.091,483.928,505.749,475.587z M202.667,362.669c-88.235,0-160-71.765-160-160s71.765-160,160-160s160,71.765,160,160S290.901,362.669,202.667,362.669z"/>
          </svg>
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  closeMobileNav: PropTypes.func.isRequired,
};

export default SearchBar;
