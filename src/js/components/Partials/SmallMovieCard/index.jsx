// libraries
import React from 'react';
import PropTypes from 'prop-types';
// constants
import { URL_IMAGE } from '../../../constants/url';

const SmallMovieCard = ({ poster, cardTitle, link }) => (cardTitle ? (
  <a className="small-movie-card catalog__movies-card small-movie-card__link" href={link}>
    <div className={`small-movie-card__image ${poster ? '' : 'small-movie-card__image--no-image'}`}>
      <img
        alt={cardTitle}
        height="450"
        loading="lazy"
        src={poster ? `${URL_IMAGE.poster}${poster}` : '/img/no-poster.jpeg'}
        width="300"
      />
    </div>
    <div className="small-movie-card__info">
      <h3 className="small-movie-card__title">{cardTitle}</h3>
    </div>
  </a>
) : null);

SmallMovieCard.defaultProps = {
  cardTitle: '',
  poster: '',
  link: '',
};

SmallMovieCard.propTypes = {
  poster: PropTypes.string,
  cardTitle: PropTypes.string,
  link: PropTypes.string,
};

export default SmallMovieCard;
