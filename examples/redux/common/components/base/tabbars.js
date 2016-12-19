const React = require('react');
const {
    Navigator,
} = require('react-native');

const { RouteHistory } = require('../base/react-native-router');
const { TabBar,Tab } = require('../base/react-native-tabbar');

class TabBars extends React.Component{
    handlePress(e,name){
        if(RouteHistory.curRoute.name !=name){
            RouteHistory.pushRoute(name,0,Navigator.SceneConfigs.FadeAndroid)
        }
    }
    render(){
		let handlePress = this.handlePress.bind(this);
		let name = RouteHistory.curRoute.name;
        return (<TabBar barColor="#fff">
                        <Tab selected={name == "/home/index"} systemIcon="home" name="/home/index" title="Home" onPress={handlePress}></Tab>
                        <Tab selected={name == "/home/page/1"} systemIcon="home"  name="/home/page/1"  title="Page1" onPress={handlePress}></Tab>
                        <Tab selected={name == "/home/page/2"} systemIcon="home"  name="/home/page/2"   title="Page2" onPress={handlePress}></Tab>
                        <Tab selected={name == "/home/page/3"} systemIcon="home"  name="/home/page/3" title="Page3" onPress={handlePress}></Tab>
                    </TabBar>)
    }
}

module.exports = TabBars;