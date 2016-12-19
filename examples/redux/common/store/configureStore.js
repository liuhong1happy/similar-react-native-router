const {createStore,applyMiddleware,compose } = require('redux');
const thunkMiddleware = require('redux-thunk');
const createLogger = require('redux-logger');
const rootReducer = require('../reducers');
const { persistStore, autoRehydrate }  = require('redux-persist');
const { AsyncStorage } = require('react-native');
const { fetchRedirectAction } = require('../actions/commonAction');

const logger = createLogger();
let createStoreWithMiddleware;

if( process.env.NODE_ENV === "development"){
	createStoreWithMiddleware = applyMiddleware(logger,thunkMiddleware)(createStore);
}else{
	createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);
}

const store = createStoreWithMiddleware(rootReducer,undefined,autoRehydrate());

let opt = {
	storage: AsyncStorage,
	transform: []
}

persistStore(store,opt,() => {
	const state = store.getState();
	if(state.userPage.redirect){
		fetchRedirectAction({ name: state.userPage.redirect });
	}else{
		fetchRedirectAction({ name: '/user/login' });
	}
});

module.exports = store;