import {
	CHANGE_ALGORITHM,
	CHANGE_VALUE,
	RESET_MATRIX,
	ERASE_TOGGLE,
	SET_MATRIX,
	STOP_RUNNING_ALGORITHM,
	START_RUNNING_ALGORITHM,
	MOUSE_UP_DOWN,
	START_MOVE,
	END_MOVE,
	CHANGE_END,
	CHANGE_START,
	CHANGE_WEIGHT,
	CHANGE_WEIGHT_BUTTON,
	CHANGE_TYPE,
	CHANGE_DONE
} from "../utils/actions";
import { STOPPED, RUNNING } from "../utils/status";

const MatrixReducer = (state, action) => {
	if (action.type === RESET_MATRIX) {
		return {
			...state,
			matrix: [...action.payload],
		};
	}

	if (action.type === SET_MATRIX) {
		return {
			...state,
			matrix: [...action.payload],
		};
	}

	if (action.type === ERASE_TOGGLE) {
		return {
			...state,
			erase: !state.erase,
		};
	}

	if (action.type === STOP_RUNNING_ALGORITHM) {
		return {
			...state,
			status: STOPPED,
		};
	}

	if (action.type === START_RUNNING_ALGORITHM) {
		return {
			...state,
			status: RUNNING,
		};
	}

	if (action.type === START_MOVE) {
		return {
			...state,
			startMove: action.payload,
		};
	}

	if (action.type === END_MOVE) {
		return {
			...state,
			endMove: action.payload,
		};
	}

	if (action.type === CHANGE_START) {
		return {
			...state,
			start: action.payload,
		};
	}

	if (action.type === CHANGE_END) {
		return {
			...state,
			end: action.payload,
		};
	}

	if (action.type === CHANGE_WEIGHT_BUTTON) {
		return {
			...state,
			weight: !state.weight
		};
	}

	if(action.type === CHANGE_WEIGHT){
		const { row, col, weight } = action.payload;
		state.matrix[row][col].weight = weight;
		return {
			...state,
			matrix: [...state.matrix],
		};
	}

	if(action.type === CHANGE_TYPE){
		const { row, col, type } = action.payload;
		state.matrix[row][col].type = type;
		return {
			...state,
			matrix: [...state.matrix],
		};
	}

	if(action.type === CHANGE_DONE){
		const { row, col, done } = action.payload;
		state.matrix[row][col].done = done;
		return {
			...state,
			matrix: [...state.matrix],
		};
	}

	if (action.type === CHANGE_VALUE) {
		const { row, col, val } = action.payload;
		state.matrix[row][col].value = val;
		return {
			...state,
			matrix: [...state.matrix],
		};
	}
	if (action.type === CHANGE_ALGORITHM) {
		return {
			...state,
			currentAlgorithm: action.payload,
		};
	}

	if (action.type === MOUSE_UP_DOWN) {
		return {
			...state,
			mouseDown: action.payload,
		};
	}
};

export default MatrixReducer;
