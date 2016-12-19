const types = require('../constants/ActionTypes');

const Ajax = require('../utils/Ajax');

const userLoginAction = function(payload){
	return {type: types.userPage.POST_USER_LOGIN, payload}
}

const { fetchRedirectAction,fetchMsgAction } = require('./commonAction');

exports.userLogin = (formData)=> dispatch => {
	Ajax({
		url: '/api/login.json',
		type: "GET",
		data: formData,
		success(data){
			dispatch( userLoginAction( data ) );
			dispatch( fetchRedirectAction( { name: "/home/index"} ) );
		},
		error(e,msg){
			dispatch(fetchMsgAction(msg));
		}
	})
}
