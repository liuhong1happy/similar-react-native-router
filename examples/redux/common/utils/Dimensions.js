import { Dimensions, StatusBar, Platform } from 'react-native';

const { width, scale, height, fontScale } = Dimensions.get("window");
const isIOS = Platform.OS === "ios";
const statusBarHeight = isIOS ? 20 : StatusBar.currentHeight;

const _fontScale = fontScale || scale;

module.exports = {
  get:Dimensions.get,
  screenWidth:width,
  screenHeight:height,
  screenScale:scale,
  width,
  height,
  scale,
  fontScale,
  statusBarHeight,
  toolBarHeight:18 * _fontScale,
  tabBarHeight:20 * _fontScale,
  contentHeight:height - statusBarHeight,
  getFontSize(s) {
    return s * _fontScale;
  },
  getWidth(_width) {
    return _width * _fontScale;
  },
  getHeight(_height) {
    return _height * _fontScale;
  },
  getSize(s) {
    return s * _fontScale;
  }
};
