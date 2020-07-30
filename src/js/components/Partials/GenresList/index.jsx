// libraries
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
// api
import { getGenres } from '../../../api/movies';
// actions
import { addActiveGenre, removeActiveGenre, clearActiveGenres } from '../../../actions/genres';

const GenresList = () => {
  const [genresData, setGenresData] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { category } = useParams();
  const activeGenres = useSelector(({ genres }) => genres.activeGenres);

  const getGenresData = async () => {
    const { genres = [] } = await getGenres();
    setGenresData([{ id: 0, name: 'All Genres' }, ...genres]);
  };

  useEffect(() => {
    getGenresData();
  }, []);

  return genresData.length ? (
    <ul className="catalog__genres-list">
      {genresData.map(({ id, name }) => {
        const isActive = (id || activeGenres.length) ? activeGenres.includes(id) : true;

        return (
          <li key={id} className={`catalog__genres-item ${isActive ? 'catalog__genres-item--active' : ''}`}>
            <Link
              className="catalog__genres-link"
              to="/"
              onClick={(event) => {
                event.preventDefault();
                if (id) {
                  if (isActive) {
                    dispatch(removeActiveGenre(id));
                  } else {
                    dispatch(addActiveGenre(id));
                  }
                } else {
                  dispatch(clearActiveGenres());
                }
                history.push(`/${category}/1/`);
              }}
            >
              {name}
            </Link>
          </li>
        );
      })}
    </ul>
  ) : null;
};

export default GenresList;
