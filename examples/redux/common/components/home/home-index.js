'use strict'
const React = require('react');
const {
    View,
	Text,
	ScrollView,
	Alert
} = require('react-native');

const TabBars = require('../base/tabbars');
const { ContentContainer, RowContainer }  = require('../base/system-container')
const ToolBar = require('../base/react-native-toolbar');
const HomePageAction = require('../../actions/homePage');
const { RouteHistory } = require('../base/react-native-router');
const { connect } = require('react-redux'); 
const { bindActionCreators } = require('redux');

const mapDispatchToProps = function(dispatch){
	return bindActionCreators(HomePageAction,dispatch);
}

const mapStateToProps = function(state){
	return {
		page: state.homePage.page
	}
}

class HomeIndexView extends React.Component{
	componentDidMount(){
		let {fetchUserInfo,page} = this.props;
		fetchUserInfo();
		Alert.alert("提示",page,[{text: '确定', onPress: () => {}}]);
	}
	render(){
		return <ContentContainer>
					<ToolBar title="首页" />
					<ScrollView>
						<View>
							<Text>{"This is page "+this.props.page+"!"}</Text>
						</View>
						<View>
							<Text>{"Current route is  "+RouteHistory.curRoute.name+"!"}</Text>
						</View>
					</ScrollView>
					<TabBars />
			</ContentContainer>
	}
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(HomeIndexView);