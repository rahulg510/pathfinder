import { END, NORMAL, WALL, START, PATH } from "./cellTypes";
import { RUNNING } from "./status";

export const isEquals = (point1, point2) => {
	return point1.row === point2.row && point1.col === point2.col;
};

export const checkIndexes = (matrix, r, c) => {
	if (r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length) {
		let cellType = matrix[r][c].type;
		return cellType === NORMAL || cellType === END;
	} else return false;
};

export const validIndex = (matrix, r, c) => {
	if (r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length) {
		return true;
	} else return false;
};

export const NEIGHBORS = [
	[-1, 0],
	[0, 1],
	[1, 0],
	[0, -1],
];

export const getClass = (cell, status) => {
	let cellClass = "cell";
	if (cell.weight === 15) {
		cellClass += " weight";
	} else if (cell.type === WALL) {
		cellClass += " wall";
	} else if (cell.type === START) {
		cellClass += " start";
	} else if (cell.type === END) {
		cellClass += " end";
	} else if (cell.type === PATH) {
		cellClass += " path";
	} else cellClass += cell.value > 0 && status === RUNNING ? " blink-bg" : "";
	return cellClass;
};
