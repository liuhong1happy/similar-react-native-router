const React = require('react');
const {
  View,
  Text,
  Navigator,
  StyleSheet
} = require('react-native');

const { SystemContainer } = require('../base/system-container')

const UserView  = (props)=> <SystemContainer>{props.children}</SystemContainer>  

module.exports = UserView;