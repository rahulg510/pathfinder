import {
	CHANGE_ALGORITHM,
	CHANGE_VALUE,
	RESET_MATRIX,
	TOGGLE_CLICKED,
	CHANGE_VALUE_WO_RENDER,
	TRIGGER_MATRIX_UPDATE,
	SET_MATRIX,
	ERASE_TOGGLE,
	STOP_RUNNING_ALGORITHM,
	START_RUNNING_ALGORITHM
} from "../utils/actions";
import {STOPPED,RUNNING} from "../utils/status";


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

	if(action.type === STOP_RUNNING_ALGORITHM){
		return{
			...state, status: STOPPED
		}
	}

	if(action.type === START_RUNNING_ALGORITHM){
		return{
			...state, status: RUNNING
		}
	}

	if (action.type === CHANGE_VALUE) {
		const { row, col, val } = action.payload;
		console.log(row,col,val);
		state.matrix[row][col] = val;
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
	if (action.type === TOGGLE_CLICKED) {
		return {
			...state,
			cellClicked: !state.cellClicked,
		};
	}

	if (action.type === CHANGE_VALUE_WO_RENDER) {
		const {row, col, val} = action.payload;
		state.matrix[row][col] = val;
		return {
			...state
		};
	}

	if (action.type === TRIGGER_MATRIX_UPDATE) {
		return {
			...state,
			matrix: [...state.matrix]
		};
	}
};

export default MatrixReducer;
