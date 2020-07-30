import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useSelector } from 'react-redux';
import {
  getCategoryData, getDetailsData, getSearchResult, getDiscoverResult,
} from '../api/movies';
import { formatCardData, parseQueryString } from '../helpers/formatData';
import Loader from '../components/Partials/Loader';
import ROUTES from '../constants/routes';
// constants
import CATEGORIES from '../constants/categories';

const COUNT_OF_TOP_CARD = 10;

const withCatalogRequest = (Component) => () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const params = useParams();
  const { activeGenres } = useSelector(({ genres }) => genres);
  const { category, page, cardId } = params;
  const isMovie = category === CATEGORIES.movie;

  const getData = useCallback(async () => {
    setIsLoading(true);

    try {
      // get data for main page
      if (location.pathname === ROUTES.mainPage) {
        const { results: mostPopularMovies = [] } = await getCategoryData('movie');
        const { results: mostPopularTvs = [] } = await getCategoryData('tv');

        const randomMovie = mostPopularMovies[Math.ceil(Math.random() * COUNT_OF_TOP_CARD) - 1];
        let bigMovieCardData = {};

        if (randomMovie) {
          const movieId = randomMovie.id;
          bigMovieCardData = await getDetailsData(CATEGORIES.movie, movieId);
        }

        setData({
          mostPopularMovies: mostPopularMovies.slice(0, COUNT_OF_TOP_CARD),
          mostPopularTvs: mostPopularTvs.slice(0, COUNT_OF_TOP_CARD),
          bigMovieCardData: formatCardData(bigMovieCardData),
        });
      } else if (cardId && !page) {
        // get data for one card
        const response = await getDetailsData(category, cardId, {
          append_to_response: [
            'recommendations', 'credits', 'reviews',
          ],
        });
        const detailsData = formatCardData(response);

        setData(detailsData);
      } else if (location.search) {
        // get data from search query
        const searchParams = parseQueryString(location.search);
        const catalogData = await getSearchResult(category, { page, ...searchParams });

        setData(catalogData);
      } else if (isMovie && activeGenres && activeGenres.length) {
        // get filtered data
        const catalogData = await getDiscoverResult({ with_genres: [...activeGenres], page });
        setData({
          ...catalogData,
          isGenresFilterShown: isMovie,
        });
      } else {
        // get catalog data
        const catalogData = await getCategoryData(category, { page });
        setData({
          ...catalogData,
          isGenresFilterShown: isMovie,
        });
      }
    } catch ({ message }) {
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [
    location.pathname, location.search, activeGenres, cardId, category, page, isMovie,
  ]);
  // };

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [
    location.pathname, location.search, activeGenres, getData,
  ]);

  const renderData = () => {
    if (error) {
      return (
        <div className="message">
          {error}
        </div>
      );
    }

    if (data) {
      return (
        <Component {...data} />
      );
    }

    return null;
  };

  return (
    <Loader isActive={isLoading}>
      { renderData() }
    </Loader>
  );
};

export default withCatalogRequest;
