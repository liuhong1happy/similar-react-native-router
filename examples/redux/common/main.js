import React from 'react';
import { Provider } from 'react-redux';
import RouterApp from './router';
import store from './store/configureStore';

const MainApp = () =>
  <Provider store={store} >
    <RouterApp />
  </Provider>;

module.exports = MainApp;
