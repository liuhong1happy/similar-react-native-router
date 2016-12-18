const {Dimensions,StatusBar,Platform} = require('react-native');
const {width,scale,height,fontScale} = Dimensions.get("window");
const isIOS = Platform.OS == "ios";
const statusBarHeight = isIOS?20: StatusBar.currentHeight;
fontScale = scale;
// fontScale = 3;

module.exports = {
	get:Dimensions.get,
	screenWidth:width,
	screenHeight:height,
	screenScale:scale,
	width:width,
	height:height,
	scale:scale,
	fontScale:fontScale,
	statusBarHeight:statusBarHeight,
	toolBarHeight:18*fontScale,
	tabBarHeight:20*fontScale,
	contentHeight:height-statusBarHeight,
	getFontSize(s){
		return s*fontScale;
	},
	getWidth(width){
		return width*fontScale;
	},
	getHeight(height){
		return height*fontScale;
	},
	getSize(s){
		return s*fontScale;
	}
}