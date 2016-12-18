const types = require('../constants/ActionTypes');

const Ajax = require('../utils/Ajax');

const userLoginAction = function(payload){
	return {type: types.userPage.POST_USER_LOGIN, payload}
}

exports.userLogin = (formData)=> dispatch => {
	Ajax({
		url: '/api/other.json',
		type: "GET",
		success(data){
			dispatch(userLoginAction(data));
		}
	})
}
