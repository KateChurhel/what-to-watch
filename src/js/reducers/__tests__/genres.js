import { ADD_ACTIVE_GENRE, REMOVE_ACTIVE_GENRE, CLEAR_ACTIVE_GENRES } from '../../constants/actions/genres';
import genres from '../genres';

const initialState = {
  activeGenres: [],
};

const activeGenreId = 1;

describe('Genres reducer works correctly', () => {
  it('Should return the initial state', () => {
    expect(genres(undefined, {})).toEqual(initialState);
  });

  it('ADD_ACTIVE_GENRE', () => {
    const action = {
      type: ADD_ACTIVE_GENRE,
      id: activeGenreId,
    };

    expect(genres(initialState, action)).toEqual(
      { activeGenres: [...initialState.activeGenres, activeGenreId] },
    );
  });

  it('REMOVE_ACTIVE_GENRE', () => {
    const action = {
      type: REMOVE_ACTIVE_GENRE,
      id: activeGenreId,
    };

    expect(genres(initialState, action)).toEqual(initialState);
  });

  it('CLEAR_ACTIVE_GENRES', () => {
    const action = {
      type: CLEAR_ACTIVE_GENRES,
    };

    expect(genres({ activeGenres: [1, 2] }, action)).toEqual(initialState);
  });
});
