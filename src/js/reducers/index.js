import { combineReducers } from 'redux';
// import { routerReducer } from 'react-router-redux';

// combine all your reducers into one root reducer
import cuts from './cuts';
import playIndex from './playIndex';
import filter from './filter';

const rootReducer = combineReducers({
	cuts,
	playIndex,
	filter
	// routing: routerReducer
});

export default rootReducer;