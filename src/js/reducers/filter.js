
function filter(state=[], action) {
	switch(action.type) {
		case 'SET_SEARCH_FILTER':
			// console.log('SET_PLAY_INDEX', state, action);
			return action.filter;
			// return state;
		default :
			return state;
	}
	return state;
}

export default filter;