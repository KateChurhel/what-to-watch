import { ADD_ACTIVE_GENRE, REMOVE_ACTIVE_GENRE, CLEAR_ACTIVE_GENRES } from '../constants/actions/genres';

const initialState = {
  activeGenres: [],
};

const genres = (state = initialState, action) => {
  const activeGenres = state.activeGenres.filter((genre) => genre !== action.id);

  switch (action.type) {
    case ADD_ACTIVE_GENRE:
      return {
        activeGenres: [...state.activeGenres, action.id],
      };
    case REMOVE_ACTIVE_GENRE:
      return { activeGenres };
    case CLEAR_ACTIVE_GENRES:
      return {
        activeGenres: [],
      };
    default:
      return state;
  }
};

export default genres;
