import { Alert, Navigator } from 'react-native';
import { RouteHistory } from '../components/base/react-native-router';
import HistoryTypes from '../constants/HistoryTypes';
import types from '../constants/ActionTypes';
import SceneConfigs from '../constants/SceneConfigs';

const fetchMsgAction = function (payload) {
  Alert.alert("提示", payload, [{ text: '确定', onPress: () => {} }]);
  return { type: types.common.FETCH_MSG, payload };
};

/** *
Navigator.SceneConfigs.PushFromRight
Navigator.SceneConfigs.FloatFromRight(default)
Navigator.SceneConfigs.FloatFromLeft
Navigator.SceneConfigs.FloatFromBottom
Navigator.SceneConfigs.FloatFromBottomAndroid
Navigator.SceneConfigs.FadeAndroid
Navigator.SceneConfigs.HorizontalSwipeJump
Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
Navigator.SceneConfigs.VerticalUpSwipeJump
Navigator.SceneConfigs.VerticalDownSwipeJump
***/

const fetchRedirectAction = function (payload) {
  payload.type = payload.type || HistoryTypes.pushRoute;
  payload.name = payload.name || "/home/index";
  payload.index = payload.index || 0;
  payload.config = payload.config || SceneConfigs.FloatFromLeft;
  RouteHistory[payload.type](payload.name, payload.index, Navigator.SceneConfigs[payload.config]);
  return { type: types.common.FETCH_REDIRECT, payload };
};

module.exports.fetchMsgAction = fetchMsgAction;
module.exports.fetchRedirectAction = fetchRedirectAction;
