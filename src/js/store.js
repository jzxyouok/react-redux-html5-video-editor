import { createStore, compose } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';

// get the global reducer
import rootReducer from './reducers/index';

// load external data if needed
// import data from "./data/data";

// defualt data goes here..
const defaultState = {
	cuts : [],
	playIndex : -1,
	filter : ""
};

// enable redux dev tools
const enhancers = compose(
	window.devToolsExtension ? window.devToolsExtension() : f => f
);

// create the store
const store = createStore(rootReducer, defaultState, enhancers);

// auto refresh our module.
if (module.hot) {
	module.hot.accept('./reducers', () => {
		const nextRootReducer = require('./reducers/index').default;
		store.replaceReducer(nextRootReducer)
	});
}

export default store;