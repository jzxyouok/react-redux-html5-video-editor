
function playIndex(state=[], action) {
	switch(action.type) {
		case 'SET_PLAY_INDEX':
			// console.log('SET_PLAY_INDEX', state, action);
			return action.index;
			// return state;
		default :
			return state;
	}
	return state;
}

export default playIndex;