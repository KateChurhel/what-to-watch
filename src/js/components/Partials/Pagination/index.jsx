// libraries
import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useLocation, Link } from 'react-router-dom';

const MAXIMUM_OF_VISIBLE_PAGE_NUMBERS = 7;

const Pagination = ({ totalPages }) => {
  const { page, category } = useParams();
  const activePage = Number(page);
  const { search } = useLocation();
  const pageNumbers = [];
  const pageLinks = [];

  // a maximum of 7 page numbers will be visible
  if (totalPages > MAXIMUM_OF_VISIBLE_PAGE_NUMBERS) {
    // active page is near the end
    if (activePage + 3 >= totalPages) {
      for (let i = (activePage - 2); i <= totalPages; i++) {
        pageNumbers.push(i);
      }

      // add more page numbers to the start of the array if there is not 5
      if (pageNumbers.length < 6) {
        // eslint-disable-next-line max-depth
        for (let i = (pageNumbers.length + 1); i < MAXIMUM_OF_VISIBLE_PAGE_NUMBERS; i++) {
          pageNumbers.unshift(pageNumbers[0] - 1);
        }
      }
    } else if (activePage <= 4) {
      // active page is near the start
      for (let i = (activePage + 2); i >= 1; i--) {
        pageNumbers.unshift(i);
      }

      // add more page numbers to the end of the array if there is not 5
      if (pageNumbers.length < 6) {
        // eslint-disable-next-line max-depth
        for (let i = (pageNumbers.length + 1); i < 7; i++) {
          pageNumbers.push(i);
        }
      }
    } else {
      // active page is not near the start or the end
      for (let i = (activePage - 2); i <= activePage + 2; i++) {
        pageNumbers.push(i);
      }
    }
  } else {
    // total amount of page numbers is less than MAXIMUM_OF_VISIBLE_PAGE_NUMBERS
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  for (let i = 0; i < pageNumbers.length; i++) {
    // add the active page as a span element
    if (pageNumbers[i] === activePage) {
      pageLinks.push(
        <span key={activePage} className="pagination__page-number pagination__active-page">
          {activePage}
        </span>,
      );
    } else {
      pageLinks.push(
        // add the search query if there is one
        <Link key={pageNumbers[i]} className="pagination__page-number" to={`/${category}/${pageNumbers[i]}${search}`}>
          {pageNumbers[i]}
        </Link>,
      );
    }
  }

  // add a link to the first page if it is not in the page links array
  if (pageNumbers[0] >= 2) {
    const firstPageLink = [
      // add the search query if there is one
      <Link key="first-page-link" className="pagination__page-number" to={`/${category}/${1}${search}`}>
        1
      </Link>,
      <span key="first-page-ellipsis" className="pagination__ellipsis">...</span>,
    ];
    pageLinks.unshift(...firstPageLink);
  }

  // add a link to the last page if it is not in the page links array
  if (pageNumbers[pageNumbers.length - 1] <= (totalPages - 2)) {
    const LastPageLink = [
      <span key="last-page-ellipsis" className="pagination__ellipsis">...</span>,
      // add the search query if there is one
      <Link key="last-page-link" className="pagination__page-number" to={`/${category}/${totalPages}${search}`}>
        {totalPages}
      </Link>,
    ];
    pageLinks.push(...LastPageLink);
  }

  return pageLinks.length > 1 ? (
    <ul className="pagination">
      {pageLinks.map((link) => (
        <li key={link.key}>{link}</li>
      ))}
    </ul>
  ) : null;
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
};

export default Pagination;
