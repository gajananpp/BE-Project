import * as types from 'types/types.js';
import { combineReducers } from 'redux';

function node1(state = [], action) {
	switch (action.type) {
		case types.UPDATE_READINGS_NODE1:
			return [
				...state,
				action.readings
			];
		default:
			return state;
	}
}

function node2(state = [], action) {
	switch (action.type) {
		case types.UPDATE_READINGS_NODE2:
			return [
				...state,
				action.readings
			];
		default:
			return state;
	}
}

const wsnApp = combineReducers({
	node1,
	node2
});

export default wsnApp;