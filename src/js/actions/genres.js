/* istanbul ignore file */
import { ADD_ACTIVE_GENRE, REMOVE_ACTIVE_GENRE, CLEAR_ACTIVE_GENRES } from '../constants/actions/genres';

export const addActiveGenre = (id) => ({
  type: ADD_ACTIVE_GENRE,
  id,
});

export const removeActiveGenre = (id) => ({
  type: REMOVE_ACTIVE_GENRE,
  id,
});

export const clearActiveGenres = () => ({
  type: CLEAR_ACTIVE_GENRES,
});
