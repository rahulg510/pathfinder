import React, { useContext, useReducer, useEffect } from "react";
import MatrixReducer from "../reducers/MatrixReducer";
import { STOPPED } from "../utils/status";
import { END, NORMAL, PATH, START } from "../utils/cellTypes";
import {
	RESET_MATRIX,
	CHANGE_VALUE,
	CHANGE_ALGORITHM,
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
} from "../utils/actions";
import { BFS, bfs } from "../utils/algorithms/BFS";
import { DFS, dfs } from "../utils/algorithms/DFS";
import { DIJ, dijkstra } from "../utils/algorithms/dijkstras";
import { GFS, gfs } from "../utils/algorithms/GreedyFirstSearch";
import { aStar, ASTAR } from "../utils/algorithms/aStar";

const MatrixContext = React.createContext();

const initialState = {
	rows: 25,
	cols: 60,
	start: { row: 5, col: 5 },
	end: { row: 20, col: 30 },
	matrix: [],
	currentAlgorithm: BFS,
	erase: false,
	status: STOPPED,
	mouseDown: false,
	startMove: false,
	endMove: false,
	weight: false,
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		localStorage.setItem("matrix", JSON.stringify(state.matrix));
		localStorage.setItem("startPoint", JSON.stringify(state.start));
		localStorage.setItem("endPoint", JSON.stringify(state.end));
	});

	function createNewMatrix(rows = state.rows, cols = state.cols) {
		let newMatrix = [];
		for (let i = 0; i < rows; i++) {
			let arr = [];
			for (let j = 0; j < cols; j++) {
				let obj = {
					value: 0,
					weight: 0,
					parent: null,
					type: NORMAL,
				};
				arr.push(obj);
			}
			newMatrix.push(arr);
		}
		newMatrix[state.start.row][state.start.col].type = START;
		newMatrix[state.start.row][state.start.col].weight = 0;
		newMatrix[state.end.row][state.end.col].type = END;
		return newMatrix;
	}

	const startRunningAlogrithm = () => {
		dispatch({ type: START_RUNNING_ALGORITHM });
	};

	const stopRunningAlogrithm = () => {
		dispatch({ type: STOP_RUNNING_ALGORITHM });
	};

	const handleMouseUpDown = (bool) => {
		dispatch({ type: MOUSE_UP_DOWN, payload: bool });
	};

	const changeStart = (row, col) => {
		dispatch({ type: CHANGE_START, payload: { row, col } });
	};

	const changeEnd = (row, col) => {
		dispatch({ type: CHANGE_END, payload: { row, col } });
	};

	const handleWeightClick = () => {
		dispatch({ type: CHANGE_WEIGHT_BUTTON });
	};

	const changeValue = (row, col, val) => {
		dispatch({ type: CHANGE_VALUE, payload: { row, col, val } });
	};

	const changeWeight = (row, col, weight) => {
		dispatch({ type: CHANGE_WEIGHT, payload: { row, col, weight } });
	};

	const changeType = (row, col, type) => {
		dispatch({ type: CHANGE_TYPE, payload: { row, col, type } });
	};

	const drawPath = async (path) => {
		while (path.length > 0) {
			let vertex = path.shift();
			changeType(vertex.row, vertex.col, PATH);
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

	const prepareMatrixForUnweighted = async () => {
		if (state.status === STOPPED) {
			for (let i = 0; i < state.rows; i++) {
				for (let j = 0; j < state.cols; j++) {
					let type = state.matrix[i][j].type;
					changeValue(i, j, 0);
					changeWeight(i, j, 0);
					if (type === PATH) {
						changeType(i, j, NORMAL);
					}
				}
			}
		}
		await new Promise((resolve) => setTimeout(resolve, 800));
	};

	const prepareMatrixForWeighted = async () => {
		if (state.status === STOPPED) {
			for (let i = 0; i < state.rows; i++) {
				for (let j = 0; j < state.cols; j++) {
					let type = state.matrix[i][j].type;
					changeValue(i, j, 0);
					if (type === PATH) {
						changeType(i, j, NORMAL);
					}
				}
			}
		}
		await new Promise((resolve) => setTimeout(resolve, 800));
	};

	const runAlgorithm = async () => {
		if (state.status === STOPPED) {
			startRunningAlogrithm();
			let path = [];
			switch (state.currentAlgorithm) {
				case DFS:
					await prepareMatrixForUnweighted();
					path = await dfs(
						state.matrix,
						state.start,
						state.end,
						changeValue
					);
					break;

				case DIJ:
					await prepareMatrixForWeighted();
					path = await dijkstra(
						state.matrix,
						state.start,
						state.end,
						changeValue,
						state.rows,
						state.cols
					);
					break;

				case GFS:
					await prepareMatrixForWeighted();
					path = await gfs(
						state.matrix,
						state.start,
						state.end,
						changeValue
					);
					break;

				case ASTAR:
					await prepareMatrixForWeighted();
					path = await aStar(
						state.matrix,
						state.start,
						state.end,
						changeValue
					);
					break;

				default:
					await prepareMatrixForUnweighted();
					path = await bfs(
						state.matrix,
						state.start,
						state.end,
						changeValue,
						state
					);
					break;
			}
			await drawPath(path);
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
					let type = state.matrix[i][j].type;
					changeValue(i, j, 0);
					changeWeight(i, j, 0);
					if (type === PATH) {
						changeType(i, j, NORMAL);
					}
				}
			}
		}
	};

	const handleMouseLeavingMatrix = () => {
		handleMouseUpDown(false);
		if (state.startMove) {
			handleStartMove(false);
			changeType(state.start.row, state.start.col, START);
		}
		if (state.endMove) {
			handleEndMove(false);
			changeType(state.end.row, state.end.col, END);
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
				handleWeightClick,
				changeWeight,
				changeType,
			}}
		>
			{children}
		</MatrixContext.Provider>
	);
};

export const useMatrixContext = () => {
	return useContext(MatrixContext);
};
