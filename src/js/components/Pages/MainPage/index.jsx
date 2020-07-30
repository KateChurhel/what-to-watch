// libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// constants
import CATEGORIES from '../../../constants/categories';
// views
import BigMovieCard from '../../Partials/BigMovieCard';
import Slider from '../../Partials/Slider';

const MainPage = ({ mostPopularMovies = [], mostPopularTvs = [], bigMovieCardData = {} }) => (
  <>
    <BigMovieCard {...bigMovieCardData} />

    <div className="container">
      {mostPopularMovies.length ? (
        <>
          <div className="swiper__title-wrapper">
            <h2 className="swiper__title">Most Popular Movies</h2>
            <Link to="/movie/1">Show All</Link>
          </div>
          <Slider category={CATEGORIES.movie} items={mostPopularMovies} />
        </>
      ) : null}
      {mostPopularTvs.length ? (
        <>
          <div className="swiper__title-wrapper">
            <h2 className="swiper__title">Most Popular TV Shows</h2>
            <Link to="/tv/1">Show All</Link>
          </div>
          <Slider category={CATEGORIES.tv} items={mostPopularTvs} />
        </>
      ) : null}
    </div>
  </>
);

MainPage.propTypes = {
  mostPopularMovies: PropTypes.arrayOf(PropTypes.object),
  mostPopularTvs: PropTypes.arrayOf(PropTypes.object),
  bigMovieCardData: PropTypes.shape({}),
};

export default MainPage;
