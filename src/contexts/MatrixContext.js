import React, { useContext, useReducer, useEffect } from "react";
import { isEquals } from "../utils/helpers";
import MatrixReducer from "../reducers/MatrixReducer";
import { RUNNING, STOPPED } from "../utils/status";
import {
	RESET_MATRIX,
	CHANGE_VALUE,
	CHANGE_ALGORITHM,
	SET_MATRIX,
	ERASE_TOGGLE,
	STOP_RUNNING_ALGORITHM,
	START_RUNNING_ALGORITHM,
	MOUSE_UP_DOWN,
	START_MOVE,
	END_MOVE,
	CHANGE_END,
	CHANGE_START,
} from "../utils/actions";
import { BFS, Bfs } from "../utils/algorithms/BFS";
import { DFS, dfs } from "../utils/algorithms/DFS";

const MatrixContext = React.createContext();

const initialState = {
	rows: 25,
	cols: 40,
	start: { row: 10, col: 15 },
	end: { row: 24, col: 39 },
	matrix: [],
	cellClicked: false,
	algorithms: [BFS, DFS],
	currentAlgorithm: BFS,
	erase: false,
	status: STOPPED,
	mouseDown: false,
	startMove: false,
	endMove: false,
};

export const MatrixProvider = ({ children }) => {
	const [state, dispatch] = useReducer(MatrixReducer, initialState);

	useEffect(() => {
		let initialMatrix = localStorage.getItem("matrix");
		if (initialMatrix) {
			initialMatrix = JSON.parse(initialMatrix);
			if (
				!(initialMatrix instanceof Array) ||
				initialMatrix.length < initialState.rows ||
				initialMatrix[0].length < initialState.cols
			) {
				initialMatrix = createNewMatrix();
			}
		} else {
			initialMatrix = createNewMatrix();
		}
		dispatch({ type: SET_MATRIX, payload: initialMatrix });

		let startPoint = localStorage.getItem("startPoint");
		if (startPoint) {
			startPoint = JSON.parse(startPoint);
			if (
				startPoint.row &&
				!isNaN(startPoint.row) &&
				startPoint.row < state.rows &&
				startPoint.col &&
				!isNaN(startPoint.col) &&
				startPoint.col < state.cols
			) {
				changeStart(startPoint.row, startPoint.col);
			}
		}
		let endPoint = localStorage.getItem("endPoint");
		if (endPoint) {
			endPoint = JSON.parse(endPoint);
			if (
				endPoint.row &&
				!isNaN(endPoint.row) &&
				endPoint.row < state.rows &&
				endPoint.col &&
				!isNaN(endPoint.col) &&
				endPoint.col < state.cols
			) {
				changeEnd(endPoint.row, endPoint.col);
			}
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("matrix", JSON.stringify(state.matrix));
		localStorage.setItem("startPoint", JSON.stringify(state.start));
		localStorage.setItem("endPoint", JSON.stringify(state.end));
	});

	function createNewMatrix(rows = state.rows, cols = state.cols) {
		let newMatrix = [];
		for (let i = 0; i < rows; i++) {
			newMatrix.push(new Array(cols).fill(0));
		}
		newMatrix[state.start.row][state.start.col] = 1;
		newMatrix[state.end.row][state.end.col] = 1000;
		return newMatrix;
	}

	
	const startRunningAlogrithm = () => {
		dispatch({ type: START_RUNNING_ALGORITHM });
	};
	
	const stopRunningAlogrithm = () => {
		console.log("STOP CLICKED");
		state.status = STOPPED;
		// dispatch({ type: STOP_RUNNING_ALGORITHM });
	};

	const handleMouseUpDown = (bool) => {
		dispatch({ type: MOUSE_UP_DOWN, payload: bool });
	};

	const changeStartEnd = (row, col, val) => {
		dispatch({ type: CHANGE_VALUE, payload: { row, col, val } });
	};

	const changeStart = (row, col, val) => {
		dispatch({ type: CHANGE_START, payload: { row, col } });
	};

	const changeEnd = (row, col, val) => {
		dispatch({ type: CHANGE_END, payload: { row, col } });
	};

	const changeValue = (row, col, val) => {
		if (isEquals(state.start, { row, col })) return;
		if (isEquals(state.end, { row, col })) return;
		dispatch({ type: CHANGE_VALUE, payload: { row, col, val } });
	};

	const drawPath = async (path) => {
		while (path.length > 0) {
			let vertex = path.shift();
			changeValue(vertex.row, vertex.col, 2000);
			await new Promise((resolve) => setTimeout(resolve, 0));
		}
	};

	const changeAlgorithm = (newAlgo) => {
		dispatch({ type: CHANGE_ALGORITHM, payload: newAlgo });
	};

	const handleEraseClick = () => {
		dispatch({ type: ERASE_TOGGLE });
	};

	const handleStartMove = (bool) => {
		dispatch({ type: START_MOVE, payload: bool });
	};

	const handleEndMove = (bool) => {
		dispatch({ type: END_MOVE, payload: bool });
	};

	const runAlgorithm = async () => {
		if (state.status === STOPPED) {
			state.status = RUNNING;
			let path = [];
			switch (state.currentAlgorithm) {
				case DFS:
					path = await dfs(
						state.matrix,
						state.start,
						state.end,
						changeValue
					);
					break;

				default:
					path = await Bfs(
						state.matrix,
						state.start,
						state.end,
						changeValue,
						state
					);
					break;
			}
			drawPath(path);
			stopRunningAlogrithm();
		}
	};

	const resetMatrix = () => {
		if (state.status === STOPPED) {
			let newMatrix = createNewMatrix();
			dispatch({ type: RESET_MATRIX, payload: newMatrix });
		}
	};

	const clearMatrix = () => {
		if (state.status === STOPPED) {
			for (let i = 0; i < state.rows; i++) {
				for (let j = 0; j < state.cols; j++) {
					let val = state.matrix[i][j];
					if (val !== -1 && val !== 0) {
						changeValue(i, j, 0);
					}
				}
			}
		}
	};

	const handleMouseLeavingMatrix = () => {
		handleMouseUpDown(false);
		if (state.startMove) {
			handleStartMove(false);
			changeStartEnd(state.start.row, state.start.col, 1);
		}
		if (state.endMove) {
			handleEndMove(false);
			changeStartEnd(state.end.row, state.end.col, 1000);
		}
	};

	const handleCellClick = (row, col) => {
		if (state.status === STOPPED) {
			let val = state.erase ? 0 : -1;
			changeValue(row, col, val);
		}
	};

	return (
		<MatrixContext.Provider
			value={{
				...state,
				resetMatrix,
				clearMatrix,
				runAlgorithm,
				changeAlgorithm,
				handleCellClick,
				changeValue,
				handleMouseLeavingMatrix,
				handleEraseClick,
				startRunningAlogrithm,
				stopRunningAlogrithm,
				handleMouseUpDown,
				handleStartMove,
				handleEndMove,
				changeStart,
				changeEnd,
				changeStartEnd,
			}}
		>
			{children}
		</MatrixContext.Provider>
	);
};

export const useMatrixContext = () => {
	return useContext(MatrixContext);
};
