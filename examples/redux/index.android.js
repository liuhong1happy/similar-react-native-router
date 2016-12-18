const React = require('react');
const {
    AppRegistry
} = require('react-native');

const MainApp = require('./common/components/main');

const Application = ()=> <MainApp />

AppRegistry.registerComponent('app', () => Application);
