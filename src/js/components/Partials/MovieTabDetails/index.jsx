// libraries
import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
// constants
import CATEGORIES from '../../../constants/categories';

const MovieTabDetails = ({
  numberOfEpisodes, numberOfSeasons, tagline, homepage, cardTitle, originalTitle,
  originalLanguage, formattedRunTime, genresList, releaseDate, status,
}) => {
  const { category } = useParams();
  const isMovie = category === CATEGORIES.movie;

  return (
    <>
      <p className="movie-card__details-item">
        <strong>Title: </strong>
        {cardTitle}
      </p>
      <p className="movie-card__details-item">
        <strong>Original Title: </strong>
        {originalTitle}
      </p>
      {tagline && (
      <p className="movie-card__details-item">
        <strong>Quote: </strong>
        {tagline}
      </p>
      )}
      {!isMovie && (
        <>
          <p className="movie-card__details-item">
            <strong>Seasons: </strong>
            {numberOfSeasons}
          </p>
          <p className="movie-card__details-item">
            <strong>Episodes: </strong>
            {numberOfEpisodes}
          </p>
        </>
      )}
      <p className="movie-card__details-item">
        <strong>
          {`${isMovie ? '' : 'Episode '} Run Time `}
        </strong>
        {formattedRunTime}
      </p>
      <p className="movie-card__details-item">
        <strong>Genre: </strong>
        {genresList}
      </p>
      <p className="movie-card__details-item">
        <strong>Language: </strong>
        {originalLanguage}
      </p>
      <p className="movie-card__details-item">
        <strong>Status: </strong>
        {status}
      </p>
      {releaseDate && (
      <p className="movie-card__details-item">
        <strong>Release date: </strong>
        {releaseDate}
      </p>
      )}
      {homepage ? (
        <p className="movie-card__details-item">
          <strong>Homepage: </strong>
          <a href={homepage} rel="noreferrer noopener" target="_blank">Link</a>
        </p>
      ) : null}
    </>
  );
};

MovieTabDetails.defaultProps = {
  numberOfEpisodes: 0,
  numberOfSeasons: 0,
  tagline: '',
  homepage: '',
  cardTitle: '',
  originalTitle: '',
  originalLanguage: '',
  formattedRunTime: '',
  genresList: '',
  releaseDate: '',
  status: '',
};

MovieTabDetails.propTypes = {
  numberOfEpisodes: PropTypes.number,
  numberOfSeasons: PropTypes.number,
  tagline: PropTypes.string,
  homepage: PropTypes.string,
  cardTitle: PropTypes.string,
  originalTitle: PropTypes.string,
  originalLanguage: PropTypes.string,
  formattedRunTime: PropTypes.string,
  genresList: PropTypes.string,
  releaseDate: PropTypes.string,
  status: PropTypes.string,
};

export default MovieTabDetails;
