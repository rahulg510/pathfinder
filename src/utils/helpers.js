export const isEquals = (point1, point2) => {
	return point1.row === point2.row && point1.col === point2.col;
};

export const checkIndexes = (matrix, r, c) => {
	if (r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length) {
		if (matrix[r][c] === 0 || matrix[r][c] === 1000) {
			return true;
		} else {
			return false;
		}
	} else return false;
};