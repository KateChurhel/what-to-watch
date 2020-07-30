// libraries
import React from 'react';
import PropTypes from 'prop-types';
// constants
import { URL_IMAGE } from '../../../constants/url';

const MovieTabCast = ({ cast = [] }) => (
  <div className="movie-card__tab-content-wrapper">
    {cast.length ? (
      <ol className="movie-card__casts">
        {cast.map(({
          cast_id: id, character, name: profileName, profile_path: profilePath, gender,
        }) => {
          const reservedImage = gender === 2 ? '/img/woman-profile.jpeg' : '/img/man-profile.jpeg';

          return (
            <li key={`cast-${id}`} className="movie-card__cast-wrapper">
              <img
                alt={profileName}
                className="movie-card__cast-image"
                height="175"
                loading="lazy"
                src={profilePath ? `${URL_IMAGE.castPhoto}${profilePath}` : reservedImage}
                width="138"
              />
              <p className="movie-card__cast-name">{profileName}</p>
              <p className="movie-card__cast-character">{character}</p>
            </li>
          );
        })}
      </ol>
    ) : (<p>Cast not found</p>)}
  </div>
);

MovieTabCast.defaultProps = {
  cast: [],
};

MovieTabCast.propTypes = {
  cast: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    character: PropTypes.string,
    name: PropTypes.string,
    profile_path: PropTypes.string,
    gender: PropTypes.number,
  })),
};

export default MovieTabCast;
