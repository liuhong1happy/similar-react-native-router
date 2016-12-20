const { combineReducers } = require('redux');

const homePage = require('./homePage');
const userPage = require('./userPage');

const rootReducer = combineReducers({
  homePage,
  userPage
});

module.exports = rootReducer;
