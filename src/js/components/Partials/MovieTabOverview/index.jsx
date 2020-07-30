// libraries
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
// helpers
import { computeRatingLevel } from '../../../helpers/rating';

const MovieTabOverview = ({ voteAverage, voteCount, overview }) => {
  const ratingLevel = useMemo(() => computeRatingLevel(voteAverage), [voteAverage]);

  return (
    <>
      <div className="movie-rating">
        <div className="movie-rating__score">{voteAverage}</div>
        <p className="movie-rating__meta">
          <span className="movie-rating__level">{ratingLevel}</span>
          <span className="movie-rating__count">{`${voteCount} ratings`}</span>
        </p>
      </div>
      <p className="movie-card__text">{overview}</p>
    </>
  );
};

MovieTabOverview.defaultProps = {
  voteAverage: 0,
  voteCount: 0,
  overview: '',
};

MovieTabOverview.propTypes = {
  voteAverage: PropTypes.number,
  voteCount: PropTypes.number,
  overview: PropTypes.string,
};

export default MovieTabOverview;
