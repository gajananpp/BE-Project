import * as types from '../types/types.js';

export function updateReadingsNode1(readings) {
	return {
		type: types.UPDATE_READINGS_NODE1,
		readings
	};
}

export function updateReadingsNode2(readings) {
	return {
		type: types.UPDATE_READINGS_NODE2,
		readings
	};
}