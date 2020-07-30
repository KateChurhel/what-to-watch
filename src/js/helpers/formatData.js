import moment from 'moment';
import 'moment-duration-format';

export const formatTime = (time, unit, format) => moment.duration(time, unit).format(format, { trim: false });
export const formatDate = (date, format) => moment(date).format(format);

export const parseQueryString = (queryString) => {
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }

  return query;
};

export const getStringValues = (array = [], key) => (array.length ? array.map((item) => item[key]).join(', ') : '');

export const formatCardData = ({
  number_of_episodes: numberOfEpisodes, number_of_seasons: numberOfSeasons, original_name: originalName,
  episode_run_time: episodeRunTime, reviews: { results: reviews = [] } = {}, homepage, original_title: originalTitle,
  original_language: originalLanguage, spoken_languages: spokenLanguages, status, runtime, tagline,
  release_date: releaseDate, genres, poster_path: poster, backdrop_path: backgroundImage,
  vote_average: voteAverage, vote_count: voteCount, overview, title, name, id,
  credits: { cast = [] } = {}, recommendations: { results: recommendations = [] } = {},
} = {}) => {
  const formattedRunTime = formatTime(runtime || episodeRunTime, 'minutes', 'h[h] m[m]');
  const releaseYear = formatDate(releaseDate, 'YYYY');
  const genresList = getStringValues(genres, 'name');
  const spokenLanguagesList = getStringValues(spokenLanguages, 'name');

  return {
    id,
    numberOfEpisodes,
    numberOfSeasons,
    episodeRunTime,
    reviews,
    homepage,
    originalLanguage,
    status,
    tagline,
    releaseDate,
    poster,
    backgroundImage,
    voteAverage,
    voteCount,
    overview,
    cast,
    recommendations,
    originalTitle: originalTitle || originalName,
    cardTitle: title || name,
    formattedRunTime,
    releaseYear,
    genresList,
    spokenLanguagesList,
  };
};
