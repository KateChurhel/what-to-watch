// libraries
import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// helpers
import { formatCardData } from '../../../helpers/formatData';
// views
import SmallMovieCard from '../SmallMovieCard';

const MoviesCatalog = ({ catalogData = [] }) => {
  const { category } = useParams();

  return (
    <div className="catalog__movies-list">
      {
        catalogData.map(
          (cardProps) => (
            <SmallMovieCard
              {...formatCardData(cardProps)}
              key={cardProps.id}
              link={`/details/${category}/${cardProps.id}`}
            />
          ),
        )
      }
    </div>
  );
};

MoviesCatalog.propTypes = {
  catalogData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default MoviesCatalog;
