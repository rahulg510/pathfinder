export const DFS = "DFS";
export const dfs = async (matrix, start, end, changeValue) => {
	let stack = [];
	let finishes = [];

	const isEquals = (point1, point2) => {
		return point1.row === point2.row && point1.col === point2.col;
	};

	const checkIndexes = (r, c) => {
		if (r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length) {
			if (matrix[r][c] === 0 || matrix[r][c] === 1000) {
				return true;
			} else {
				return false;
			}
		} else return false;
	};
	const push = (r, c) => {
		stack.push({ row: r, col: c });
	};

	const visitNeighbors = ({ row, col, path }) => {
		if (checkIndexes(row - 1, col)) {
			matrix[row - 1][col] = 2;
			push(row - 1, col);
		}
		if (checkIndexes(row + 1, col)) {
			matrix[row + 1][col] = 2;
			push(row + 1, col);
		}
		if (checkIndexes(row, col + 1)) {
			matrix[row][col + 1] = 2;
			push(row, col + 1);
		}
		if (checkIndexes(row, col - 1)) {
			matrix[row][col - 1] = 2;
			push(row, col - 1);
		}
		console.log("callback");
		console.log("visiting neighbors");
	};

	let begin = {
		row: start.row,
		col: start.col,
	};
	stack.push(begin);

	while (stack.length > 0) {
		let cell = stack.pop();
		if (isEquals(cell, end)) {
			// finishes.push({
			//     count: stack.length
			// })
			return;
		}
        visitNeighbors(cell);
		// setTimeout(() => {
		// }, 200);
		console.log("returned to main");
		changeValue(cell.row, cell.col, 3);
	}
};
