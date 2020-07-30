// libraries
import React from 'react';
import { Route, Switch } from 'react-router-dom';
// constants
import ROUTES from '../constants/routes';
// HOC
import withCatalogRequest from '../hoc/withCatalogRequest';
// views
import CatalogPage from './Pages/CatalogPage';
import DetailsPage from './Pages/DetailsPage';
import MainPage from './Pages/MainPage';
import PageNotFound from './Pages/404';
import Footer from './Partials/Footer';
import Header from './Partials/Header';

const App = () => (
  <>
    <Header />
    <main>
      <Switch>
        <Route component={withCatalogRequest(DetailsPage)} path={ROUTES.detailsPage} />
        <Route component={withCatalogRequest(CatalogPage)} path={[ROUTES.search, ROUTES.catalog]} />
        <Route
          component={withCatalogRequest(MainPage)}
          exact
          path={ROUTES.mainPage}
        />
        <Route
          component={PageNotFound}
          exact
          path="*"
        />
      </Switch>
    </main>
    <Footer />
  </>
);

export default App;
