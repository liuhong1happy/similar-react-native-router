const { Platform } = require('react-native');

module.exports = {
	OS:Platform.OS,
	isIOS:Platform.OS === 'ios',
	isAndroid:Platform.OS === 'android',
	Version:Platform.Version
}