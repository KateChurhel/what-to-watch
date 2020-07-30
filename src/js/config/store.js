// libraries
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
// reducers
import rootReducer from '../reducers';

const logger = createLogger();

export default createStore(
  rootReducer,
  applyMiddleware(logger),
);
