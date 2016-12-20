const types = require('../constants/ActionTypes');

const homePage = {
  page: ""
};

module.exports = function (state = homePage, action) {
  const { type, payload } = action;
  switch (type) {
    case types.homePage.FETCH_USER_INFO:
      return { ...state, page: payload.data.page };
    default:
      return state;
  }
};
