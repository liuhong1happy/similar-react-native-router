const types = require('../constants/ActionTypes');

const Ajax = require('../utils/Ajax');

const { fetchMsgAction } = require('./commonAction');

const fetchUserInfoAction = function(payload){
	return {type: types.homePage.FETCH_USER_INFO, payload}
}

exports.fetchUserInfo = ()=> dispatch => {
	Ajax({
		url: '/api/info.json',
		type: "GET",
		success(data){
			dispatch(fetchUserInfoAction(data));
		},
		error(e,msg){
			dispatch(fetchMsgAction(msg));
		}
	})
}
