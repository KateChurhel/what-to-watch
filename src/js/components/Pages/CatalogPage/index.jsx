// libraries
import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation } from 'react-router-dom';
// views
import GenresList from '../../Partials/GenresList';
import Pagination from '../../Partials/Pagination';
import MoviesCatalog from '../../Partials/MoviesCatalog';
// constants
import CATEGORIES from '../../../constants/categories';

const CatalogPage = ({
  total_pages: totalPages, total_results: totalResults, results: catalogData = [], isGenresFilterShown = false,
}) => {
  const { category } = useParams();
  const { search } = useLocation();

  let headerText;

  if (search) {
    headerText = `Search Results - ${totalResults} found`;
  } else {
    headerText = `${category === CATEGORIES.movie ? 'Movies' : 'TV Shows'}`;
  }

  return (
    <div className="catalog container ">
      <h2 className="page-title">{headerText}</h2>
      {isGenresFilterShown && (<GenresList />)}
      {catalogData.length > 0 ? (
        <>
          <MoviesCatalog catalogData={catalogData} />
          <Pagination totalPages={totalPages} />
        </>
      ) : (<div className="page-message">No results found</div>)}
    </div>
  );
};

CatalogPage.propTypes = {
  total_pages: PropTypes.number.isRequired,
  total_results: PropTypes.number.isRequired,
  results: PropTypes.arrayOf(PropTypes.object),
  isGenresFilterShown: PropTypes.bool,
};

export default CatalogPage;
