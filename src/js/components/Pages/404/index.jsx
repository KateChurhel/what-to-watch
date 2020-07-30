// libraries
import React from 'react';
import { useHistory } from 'react-router-dom';
// constants
import ROUTES from '../../../constants/routes';

const PageNotFound = () => {
  const history = useHistory();

  const redirectToHomePage = () => {
    history.push(ROUTES.mainPage);
  };

  return (
    <div className="container page-not-found">
      <div className="page-not-found__title">404</div>
      <p className="page-not-found__subtitle">Oops! Page not found</p>
      <p className="page-not-found__description">Please go to the Home page by clicking the button below.</p>
      <button
        className="button page-not-found__button"
        onClick={redirectToHomePage}
        type="button"
      >
        Go to Home page
      </button>
    </div>
  );
};

export default PageNotFound;
