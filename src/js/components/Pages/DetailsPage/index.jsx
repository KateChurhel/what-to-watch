// libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
// constants
import { MOVIE_TABS } from '../../../constants/categories';
import { URL_IMAGE } from '../../../constants/url';
// views
import Slider from '../../Partials/Slider';
import MovieTabOverview from '../../Partials/MovieTabOverview';
import MovieTabReviews from '../../Partials/MovieTabReviews';
import MovieTabDetails from '../../Partials/MovieTabDetails';
import MovieTabCast from '../../Partials/MovieTabCast';

const DetailsPage = (props) => {
  const {
    formattedRunTime, releaseYear, genresList, cardTitle, reviews = [], tagline,
    poster, backgroundImage, voteAverage, voteCount, overview, cast = [], recommendations = [],
  } = props;
  const [activeTab, setActiveTab] = useState(MOVIE_TABS.OVERVIEW);
  const { category } = useParams();

  const renderActiveTab = () => {
    switch (activeTab) {
      case MOVIE_TABS.DETAILS:
        return (
          <MovieTabDetails {...props} />
        );
      case MOVIE_TABS.REVIEWS:
        return (
          <MovieTabReviews reviews={reviews} />
        );
      case MOVIE_TABS.CAST:
        return (
          <MovieTabCast cast={cast} />
        );
      default:
        return (
          <MovieTabOverview
            cast={cast}
            overview={overview}
            voteAverage={voteAverage}
            voteCount={voteCount}
          />
        );
    }
  };

  return (
    <>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div
            className="movie-card__bg"
            style={{ backgroundImage: `url('${URL_IMAGE.backgroundImage}${backgroundImage}')` }}
          />
          <div className="container">
            <div className=" movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{`${cardTitle} (${releaseYear})`}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genresList}</span>
                  <span className="movie-card__runtime">{formattedRunTime}</span>
                </p>
                <i className="movie-card__tagline">{tagline}</i>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className=" movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img
                  alt={cardTitle}
                  height="327"
                  loading="lazy"
                  src={`${URL_IMAGE.poster}${poster}`}
                  width="218"
                />
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <ul className="movie-nav__list">
                    {Object.values(MOVIE_TABS)
                      .map((tab) => (
                        <li
                          key={tab}
                          className={`movie-nav__item ${tab === activeTab ? 'movie-nav__item--active' : ''}`}
                        >
                          <button
                            className="movie-nav__link"
                            onClick={(event) => {
                              event.preventDefault();
                              setActiveTab(tab);
                            }}
                            type="button"
                          >
                            {tab}
                          </button>
                        </li>
                      ))}
                  </ul>
                </nav>

                <div className="movie-card__tab-wrapper">
                  {renderActiveTab()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {recommendations.length ? (
        <div className="container">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <Slider category={category} items={recommendations} />
          </section>
        </div>
      ) : null}
    </>
  );
};

DetailsPage.propTypes = {
  formattedRunTime: PropTypes.string,
  releaseYear: PropTypes.string,
  genresList: PropTypes.string,
  cardTitle: PropTypes.string,
  reviews: PropTypes.arrayOf(PropTypes.object),
  tagline: PropTypes.string,
  poster: PropTypes.string,
  backgroundImage: PropTypes.string,
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
  overview: PropTypes.string,
  cast: PropTypes.arrayOf(PropTypes.object),
  recommendations: PropTypes.arrayOf(PropTypes.object),
};

export default DetailsPage;
