const React = require('react');
const {
  View,
  Text,
  Navigator,
  StyleSheet
} = require('react-native');

const { SystemContainer } = require('../base/system-container')

const HomeView  = (props)=> <SystemContainer> {props.children} </SystemContainer>  

module.exports = HomeView;