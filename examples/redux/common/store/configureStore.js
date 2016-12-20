import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import rootReducer from '../reducers';
import { fetchRedirectAction } from '../actions/commonAction';

const logger = createLogger();
let createStoreWithMiddleware;

if (process.env.NODE_ENV === "development") {
  createStoreWithMiddleware = applyMiddleware(logger, thunkMiddleware)(createStore);
} else {
  createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

const store = createStoreWithMiddleware(rootReducer, undefined, autoRehydrate());

const opt = {
  storage: AsyncStorage,
  transform: []
};

persistStore(store, opt, () => {
  const state = store.getState();
  if (state.userPage.redirect) {
    fetchRedirectAction({ name: state.userPage.redirect });
  } else {
    fetchRedirectAction({ name: '/user/login' });
  }
});

module.exports = store;
