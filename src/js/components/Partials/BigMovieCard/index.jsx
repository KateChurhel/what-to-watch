// libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// constants
import { URL_IMAGE } from '../../../constants/url';
import CATEGORIES from '../../../constants/categories';

const BigMovieCard = ({
  id, poster, backgroundImage, formattedRunTime, releaseYear, genresList, cardTitle, tagline,
}) => (id ? (
  <section className="movie-card">
    <div
      className="movie-card__bg"
      style={{ backgroundImage: `url('${URL_IMAGE.backgroundImage}${backgroundImage}')` }}
    />

    <div className="container">
      <div className=" movie-card__wrap">
        <div className="movie-card__info movie-card__info--main">
          <div className="movie-card__poster movie-card__poster--main">
            <img alt={cardTitle} loading="lazy" src={`${URL_IMAGE.poster}${poster}`} />
          </div>

          <div className="movie-card__desc">
            <h2 className="movie-card__title">{`${cardTitle} (${releaseYear})`}</h2>
            <p className="movie-card__meta">
              <span className="movie-card__genre">{genresList}</span>
              <span className="movie-card__runtime">{formattedRunTime}</span>
            </p>
            <i className="movie-card__tagline movie-card__tagline--main">{tagline}</i>

            <Link className="button movie-card__button" to={`/details/${CATEGORIES.movie}/${id}`}>More Info</Link>
          </div>
        </div>
      </div>
    </div>
  </section>
) : null);

BigMovieCard.defaultProps = {
  id: 0,
  poster: '',
  backgroundImage: '',
  formattedRunTime: '',
  releaseYear: '',
  genresList: '',
  cardTitle: '',
  tagline: '',
};

BigMovieCard.propTypes = {
  id: PropTypes.number,
  poster: PropTypes.string,
  backgroundImage: PropTypes.string,
  formattedRunTime: PropTypes.string,
  releaseYear: PropTypes.string,
  genresList: PropTypes.string,
  cardTitle: PropTypes.string,
  tagline: PropTypes.string,
};

export default BigMovieCard;
