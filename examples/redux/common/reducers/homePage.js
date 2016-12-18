const types = require('../constants/ActionTypes');

const homePage = {
	page: ""
};

module.exports = function(state = homePage,action){
	const {type, payload} = action;
	switch(type){
		case types.homePage.FETCH_USER_INFO:
			return { ...state, pages: payload.data.pages };
		default:
			return state;
	}
}