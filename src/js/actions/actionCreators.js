
// actions goes here

export function addCut(data) {
	return {
		type : "ADD_CUT",
		data
	}
}

export function deleteCut(index) {
	return {
		type : "DELETE_CUT",
		index
	}
}

export function setTags(index, tags) {
	return {
		type : "SET_TAGS",
		index,
		tags
	}
}

export function setPlayIndex(index) {
	return {
		type : "SET_PLAY_INDEX",
		index
	}
}

export function setSearchFilter(filter) {
	return {
		type : "SET_SEARCH_FILTER",
		filter
	}
}

