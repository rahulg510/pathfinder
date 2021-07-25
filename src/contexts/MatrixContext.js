import React, { useContext, useReducer, useEffect } from "react";
import MatrixReducer from "../reducers/MatrixReducer";
import { STOPPED, RUNNING } from "../utils/status";
import {
	RESET_MATRIX,
	CHANGE_VALUE,
	CHANGE_ALGORITHM,
	TOGGLE_CLICKED,
	CHANGE_VALUE_WO_RENDER,
	TRIGGER_MATRIX_UPDATE,
	SET_MATRIX,
	ERASE_TOGGLE,
	STOP_RUNNING_ALGORITHM,
	START_RUNNING_ALGORITHM,
} from "../utils/actions";
import { BFS, bfs } from "../utils/algorithms/BFS";
import { DFS, dfs } from "../utils/algorithms/DFS";

const MatrixContext = React.createContext();

const initialState = {
	rows: 25,
	cols: 40,
	start: { row: 10, col:15 },
	end: { row: 24, col: 39 },
	matrix: [],
	cellClicked: false,
	algorithms: [BFS, DFS],
	currentAlgorithm: BFS,
	erase: false,
	status: STOPPED,
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
	}, []);

	useEffect(() => {
		localStorage.setItem("matrix", JSON.stringify(state.matrix));
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

	const changeValue = (row, col, val) => {
		if (state.start.row === row && state.start.col === col) return;
		if (state.end.row === row && state.end.col === col) return;
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

	const handleMultipleChanges = (changes) => {
		changes.forEach((change) => {
			dispatch({ type: CHANGE_VALUE_WO_RENDER, payload: change });
		});
		dispatch({ type: TRIGGER_MATRIX_UPDATE });
	};

	const runAlgorithm = async () => {
		if ((state.status === STOPPED)) {
			dispatch({type: START_RUNNING_ALGORITHM})
			let path = [];
			switch (state.currentAlgorithm) {
				case DFS:
					path = await dfs(
						state.matrix,
						state.start,
						state.end,
						changeValue,
					);
					break;

				default:
					path = await bfs(
						state.matrix,
						state.start,
						state.end,
						changeValue
					);
					break;
			}
			drawPath(path);
			dispatch({type: STOP_RUNNING_ALGORITHM})
		}
	};

	const resetMatrix = () => {
		if ((state.status === STOPPED)) {
			let newMatrix = createNewMatrix();
			dispatch({ type: RESET_MATRIX, payload: newMatrix });
		}
		
	};

	const clearMatrix = () => {
		if ((state.status === STOPPED)) {
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
		if (state.cellClicked) {
			dispatch({ type: TOGGLE_CLICKED });
			return;
		}
	};

	const stopRunningAlogrithm = () => {
		dispatch({ type: STOP_RUNNING_ALGORITHM });
	};

	const startRunningAlogrithm = () => {
		dispatch({ type: START_RUNNING_ALGORITHM });
	};

	const handleCellClick = (row, col) => {
		if (state.status) {
			if (state.cellClicked) {
				dispatch({ type: TOGGLE_CLICKED });
				return;
			}
			let val = state.erase ? 0 : -1;
			changeValue(row, col, val);
			dispatch({ type: TOGGLE_CLICKED });
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
			}}
		>
			{children}
		</MatrixContext.Provider>
	);
};

export const useMatrixContext = () => {
	return useContext(MatrixContext);
};
