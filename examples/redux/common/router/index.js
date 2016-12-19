const React = require('react');
const { Route, Router } = require('../components/base/react-native-router');
const { View} = require('react-native');
const { width, height } = require('../utils/Dimensions');

const UserPage = require('../components/user');
const UserWelcomePage = require('../components/user/user-welcome');
const UserLoginPage = require('../components/user/user-login');

const HomePage = require('../components/home');
const HomeIndexPage = require('../components/home/home-index');

const MainApp = (props)=> 
	<View style={styles.main}>
		{props.children}
	</View>

const styles = {
    main:{
        height:height,
        width:width
    }
}

class RouterApp extends React.Component {
	render(){
		return (
			<Router defaultRoute="/user/welcome" path="/" component={MainApp}>
				<Route path="home" component={HomePage}>
					<Route path="index" component={HomeIndexPage} />
					<Route path="page/:index" component={HomeIndexPage} />
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