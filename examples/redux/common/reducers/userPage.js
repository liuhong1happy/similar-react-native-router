const types = require('../constants/ActionTypes');

const userPage = {
	redirect: ""
};

module.exports = function(state = userPage,action){
	const {type, payload} = action;
	switch(type){
		case types.userPage.POST_USER_LOGIN:
			return { ...state, redirect: payload.data.redirect };
		default:
			return state;
	}
}