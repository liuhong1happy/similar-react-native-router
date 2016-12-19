const React = require('react');
const RouterApp = require('./router');

const {Provider} = require('react-redux');

const store = require('./store/configureStore')

const MainApp = ()=> 
	<Provider store={store} >
		<RouterApp />
	</Provider>
	
module.exports = MainApp;