
function cuts(state=[], action) {
	switch(action.type) {
		case 'ADD_CUT':
			return [
				...state,
				{
					start: action.data.start,
					end: action.data.end,
					title: "",
					tags: []
				}
			];
		case 'DELETE_CUT':
			var index = action.index;
			return [
				...state.slice(0, index),
				...state.slice(index + 1)
			];
		case 'SET_TAGS':
			// console.log(state, action);
			var index = action.index;
			var tags  = action.tags;
			var o = Object.assign({}, state[index]);
			o.tags = tags;
			return [
				...state.slice(0, index),
				o,
				...state.slice(index + 1)
			];
		default:
			return state;
	}
	return state;
}

export default cuts;