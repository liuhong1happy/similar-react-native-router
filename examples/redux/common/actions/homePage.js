const types = require('../constants/ActionTypes');

const Ajax = require('../utils/Ajax');

const fetchUserInfoAction = function(payload){
	return {type: types.homePage.FETCH_USER_INFO, payload}
}

exports.fetchUserInfo = ()=> dispatch => {
	Ajax({
		url: '/api/v2/student/baseinfo',
		type: "GET",
		success(data){
			dispatch(fetchUserInfoAction(data));
		}
	})
}
