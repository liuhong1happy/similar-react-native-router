const React = require('react');
const { Route, Router } = require('similar-react-native-router');
const { View} = require('react-native');
const { width, height } = require('../utils/Dimensions');

const UserPage = require('../components/user');
const UserWelcomePage = require('../components/user/user-welcome');
const UserLoginPage = require('../components/user/user-login');

const HomePage = require('../components/home');
const HomeInexPage = require('../components/home/home-index');

const MainApp = React.createClass({
    render:function(){
        return (<View style={styles.main}>
                {this.props.children}
            </View>)
    }
})
	
const styles = {
    main:{
        height:height,
        width:width
    }
}

class RouterApp extends React.Component {
	render(){
		return (
			<Router defaultRoute="/home/index" path="/" component={MainApp}>
				<Route path="home" component={HomePage}>
					<Route path="index" component={HomeIndexPage} />
				</Route>
				<Route path="user" component={UserPage}>
					<Route path="welcome" component={UserWelcomePage} />
					<Route path="login" component={UserLoginPage} />
				</Route>
			</Router>
		)
	}
}

module.exports = RouterApp;