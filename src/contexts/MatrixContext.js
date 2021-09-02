import React, { useContext, useReducer, useEffect } from "react";
import MatrixReducer from "../reducers/MatrixReducer";
import { BUSY, RUNNING, STOPPED } from "../utils/status";
import { END, NORMAL, PATH, START } from "../utils/cellTypes";
import {
	RESET_MATRIX,
	CHANGE_VALUE,
	CHANGE_ALGORITHM,
	SET_MATRIX,
	MOUSE_UP_DOWN,
	START_MOVE,
	END_MOVE,
	CHANGE_END,
	CHANGE_START,
	CHANGE_WEIGHT,
	CHANGE_WEIGHT_BUTTON,
	CHANGE_TYPE,
	CHANGE_DONE,
	RESET_WEIGHT_BUTTON,
	MODAL_CHANGE,
	CHANGE_STATUS,
} from "../utils/actions";
import {
	GFS,
	gfs,
	ASTAR,
	aStar,
	DFS,
	dfs,
	bfs,
	DIJ,
	BDIJ,
	dijkstra,
	biDijkstra,
	BASTAR,
	biAStar,
	BGFS,
	biGreedyFirstSearch,
} from "../utils/algorithms/algorithms";

import {
	BINARY_TREE_MAZE,
	createRandomMaze,
	createRandomMazeWeighted,
	createBinaryTreeMaze,
	RANDOM_MAZE_WEIGHTED,
	RECURSIVE_DIVISION,
	createRecursiveDivisionMaze,
	createRecursiveDivisionWeightedMaze,
	RECURSIVE_DIVISION_WEIGHTED,
} from "../utils/mazeAlgorithms/mazeAlgorithms";

import { useAlert } from "react-alert";
import { isEquals, NEIGHBORS } from "../utils/helpers";

const MatrixContext = React.createContext();

const initialState = {
	rows: 20,
	cols: 60,
	start: { row: 5, col: 5 },
	end: { row: 17, col: 39 },
	matrix: [],
	currentAlgorithm: "",
	erase: false,
	status: STOPPED,
	mouseDown: false,
	startMove: false,
	endMove: false,
	weight: false,
	weightOnMatrix: false,
	tutorialOpen: true,
};

export const MatrixProvider = ({ children }) => {
	const [state, dispatch] = useReducer(MatrixReducer, initialState);
	const alert = useAlert();
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
					done: false,
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

	const changeStatus = (status) => {
		dispatch({ type: CHANGE_STATUS, payload: status });
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

	const resetWeightButton = () => {
		dispatch({ type: RESET_WEIGHT_BUTTON });
	};

	const changeValue = (row, col, val) => {
		dispatch({ type: CHANGE_VALUE, payload: { row, col, val } });
	};

	const changeWeight = (row, col, weight) => {
		dispatch({ type: CHANGE_WEIGHT, payload: { row, col, weight } });
	};

	const changeDone = (row, col, done) => {
		dispatch({ type: CHANGE_DONE, payload: { row, col, done } });
	};

	const changeType = (row, col, type) => {
		dispatch({ type: CHANGE_TYPE, payload: { row, col, type } });
	};

	const drawPath = async (path) => {
		let nextToEachOther = false;
		NEIGHBORS.forEach((neighbor) => {
			let row = state.start.row + neighbor[0];
			let col = state.start.col + neighbor[1];
			if (isEquals({ row, col }, state.end)) {
				nextToEachOther = true;
			}
		});

		if (nextToEachOther) {
			if (
				state.currentAlgorithm !== DFS ||
				(state.currentAlgorithm === DFS && path.length === 0)
			) {
				changeStatus(STOPPED);
				return;
			}
		}
		let last = state.start;
		let pathCost = 0;
		if (path.length > 0) {
			while (path.length > 0) {
				changeType(last.row, last.col, PATH);
				let vertex = path.shift();
				pathCost += state.matrix[vertex.row][vertex.col].weight + 1;
				changeType(vertex.row, vertex.col, START);
				last = vertex;
				await new Promise((resolve) => setTimeout(resolve, 0));
			}
			await new Promise((resolve) => setTimeout(resolve, 0));
			changeType(last.row, last.col, PATH);
			changeType(state.start.row, state.start.col, START);
		} else {
			alert.info("No Path Found");
		}
		console.log(state.currentAlgorithm, pathCost + 1);
		changeStatus(STOPPED);
	};

	const changeAlgorithm = (newAlgo) => {
		dispatch({ type: CHANGE_ALGORITHM, payload: newAlgo });
	};

	const handleStartMove = (bool) => {
		dispatch({ type: START_MOVE, payload: bool });
	};

	const handleEndMove = (bool) => {
		dispatch({ type: END_MOVE, payload: bool });
	};

	const handleTutorialModal = (bool) => {
		dispatch({ type: MODAL_CHANGE, payload: bool });
	};

	const prepareMatrixForUnweighted = async () => {
		if (state.status === STOPPED) {
			for (let i = 0; i < state.rows; i++) {
				for (let j = 0; j < state.cols; j++) {
					let c = state.matrix[i][j];
					c.parent = null;
					changeValue(i, j, 0);
					changeWeight(i, j, 0);
					changeDone(i, j, false);
					if (c.type === PATH) {
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
					let c = state.matrix[i][j];
					c.parent = null;
					changeValue(i, j, 0);
					changeDone(i, j, false);
					if (c.type === PATH) {
						changeType(i, j, NORMAL);
					}
				}
			}
		}
		await new Promise((resolve) => setTimeout(resolve, 800));
	};

	const createMaze = async (algo) => {
		if (state.status === STOPPED) {
			changeStatus(RUNNING);
			resetMatrix();
			switch (algo) {
				case RANDOM_MAZE_WEIGHTED:
					await createRandomMazeWeighted(
						state.matrix,
						state.start,
						state.end,
						changeType,
						changeWeight
					);
					break;

				case BINARY_TREE_MAZE:
					await createBinaryTreeMaze(
						state.matrix,
						state.start,
						state.end,
						changeType,
						changeWeight
					);
					break;

				case RECURSIVE_DIVISION:
					await createRecursiveDivisionMaze(
						state.matrix,
						state.start,
						state.end,
						changeType
					);
					break;

				case RECURSIVE_DIVISION_WEIGHTED:
					await createRecursiveDivisionWeightedMaze(
						state.matrix,
						state.start,
						state.end,
						changeType,
						changeWeight
					);
					break;

				default:
					await createRandomMaze(
						state.matrix,
						state.start,
						state.end,
						changeType
					);
					break;
			}
			changeStatus(STOPPED);
		}
	};

	const runAlgorithm = async () => {
		if (state.status === STOPPED) {
			resetWeightButton();
			changeStatus(RUNNING);
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
						changeDone
					);
					break;

				case BDIJ:
					await prepareMatrixForWeighted();
					path = await biDijkstra(
						state.matrix,
						state.start,
						state.end,
						changeValue,
						changeDone
					);
					break;

				case GFS:
					await prepareMatrixForWeighted();
					path = await gfs(
						state.matrix,
						state.start,
						state.end,
						changeValue,
						changeDone
					);
					break;

				case ASTAR:
					await prepareMatrixForWeighted();
					path = await aStar(
						state.matrix,
						state.start,
						state.end,
						changeValue,
						changeDone
					);
					break;
				case BASTAR:
					await prepareMatrixForWeighted();
					path = await biAStar(
						state.matrix,
						state.start,
						state.end,
						changeValue,
						changeDone
					);
					break;

				case BGFS:
					await prepareMatrixForWeighted();
					path = await biGreedyFirstSearch(
						state.matrix,
						state.start,
						state.end,
						changeValue,
						changeDone
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
			await new Promise((r) => setTimeout(r, 1000));
			changeStatus(BUSY);
			await drawPath(path);
		}
	};

	const resetMatrix = () => {
		if (state.status === STOPPED) {
			resetWeightButton();
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
					changeDone(i, j, false);
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
				handleMouseUpDown,
				handleStartMove,
				handleEndMove,
				changeStart,
				changeEnd,
				handleWeightClick,
				changeWeight,
				changeType,
				changeDone,
				createMaze,
				handleTutorialModal,
			}}
		>
			{children}
		</MatrixContext.Provider>
	);
};

export const useMatrixContext = () => {
	return useContext(MatrixContext);
};
