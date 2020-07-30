// libraries
import React from 'react';
import PropTypes from 'prop-types';

const MovieTabReviews = ({ reviews = [] }) => (
  <div className="movie-card__tab-content-wrapper">
    {reviews.length ? reviews.map(({
      id, author, content, url,
    }) => (
      <div key={`review-${id}`} className="review">
        <blockquote className="review__quote">
          <p className="review__text">{content}</p>
          <footer className="review__details">
            <cite className="review__author">{author}</cite>
            <a href={url}>More Details</a>
          </footer>
        </blockquote>
      </div>
    )) : 'No reviews'}
  </div>
);

MovieTabReviews.deafultProps = {
  reviews: [],
};

MovieTabReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })),
};

export default MovieTabReviews;
