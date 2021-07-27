import { END, NORMAL } from "./cellTypes";

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
