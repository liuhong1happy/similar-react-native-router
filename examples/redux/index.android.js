const React = require('react');
const {
    AppRegistry
} = require('react-native');

const MainApp = require('./common/main');

const Application = ()=> <MainApp />

AppRegistry.registerComponent('app', () => Application);
