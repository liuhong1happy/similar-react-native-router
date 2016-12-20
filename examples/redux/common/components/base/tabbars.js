import React from 'react';
import {
    Navigator
} from 'react-native';

import { RouteHistory } from '../base/react-native-router';
import { TabBar, Tab } from '../base/react-native-tabbar';

class TabBars extends React.Component {
  handlePress(e, name) {
    if (RouteHistory.curRoute.name !== name) {
      RouteHistory.pushRoute(name, 0, Navigator.SceneConfigs.FadeAndroid);
    }
  }
  render() {
    const handlePress = this.handlePress.bind(this);
    const name = RouteHistory.curRoute.name;
    return (<TabBar barColor="#fff">
      <Tab selected={name === "/home/index"} systemIcon="home" name="/home/index" title="Home" onPress={handlePress} />
      <Tab selected={name === "/home/page/1"} systemIcon="home" name="/home/page/1" title="Page1" onPress={handlePress} />
      <Tab selected={name === "/home/page/2"} systemIcon="home" name="/home/page/2" title="Page2" onPress={handlePress} />
      <Tab selected={name === "/home/page/3"} systemIcon="home" name="/home/page/3" title="Page3" onPress={handlePress} />
    </TabBar>);
  }
}

module.exports = TabBars;
