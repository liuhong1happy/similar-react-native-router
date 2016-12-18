const React = require('react');
const {
    Navigator,
} = require('react-native');

const { History } = require('../../../../../react-native-router');
const { TabBar,Tab } = require('../base/react-native-tabbar');

class TabBars extends React.Component{
    handlePress(e,name){
        if(this.props.name!=name){
            History.pushRoute(name,0,Navigator.SceneConfigs.FadeAndroid)
        }
    }
    render(){
		var handlePress = this.handlePress.bind(this);
		var { name } = this.props;
        return (<TabBar barColor="#fff">
                        <Tab selected={name == "/home/index"} systemIcon="home" name="/home/index" title="Home" onPress={handlePress}></Tab>
                        <Tab selected={name == "/home/page1"} systemIcon="home"  name="/home/page1"  title="Page1" onPress={handlePress}></Tab>
                        <Tab selected={name == "/home/page2"} systemIcon="home"  name="/home/page2"   title="Page2" onPress={handlePress}></Tab>
                        <Tab selected={name == "/home/page3"} systemIcon="home"  name="/home/page3" title="Page3" onPress={handlePress}></Tab>
                    </TabBar>)
    }
}

module.exports = TabBars;