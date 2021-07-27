import { isEquals, checkIndexes } from "../helpers";

export const dfs = async (matrix, start, end, changeValue) => {
	let stack = [];
	let count = 0;
	const push = (row, col) => {
		stack.push({ row, col });
	};

	const visitNeighbors = ({ row, col }) => {
		if (checkIndexes(matrix, row, col - 1)) {
			push(row, col - 1);
		}
		if (checkIndexes(matrix, row, col + 1)) {
			push(row, col + 1);
		}
		if (checkIndexes(matrix, row - 1, col)) {
			push(row - 1, col);
		}
		if (checkIndexes(matrix, row + 1, col)) {
			push(row + 1, col);
		}
	};

	let begin = {
		row: start.row,
		col: start.col,
	};
	stack.push(begin);

	let path = [];
	while (stack.length > 0) {
		let cell = stack.pop();
		if (isEquals(cell, end)) {
			path = path.filter((c) => matrix[c.row][c.col] === 2);
			return Promise.resolve(path);
		}
		if (!isEquals(start, cell)) {
			let val = matrix[cell.row][cell.col];
			if (val === 0) {
				changeValue(cell.row, cell.col, 2);
				push(cell.row, cell.col);
				path.push(cell);
			} else if (val === 2) changeValue(cell.row, cell.col, 3);
		}

		visitNeighbors(cell);
		if (count % 3 === 0) {
			await new Promise((resolve) => setTimeout(resolve, 0));
		}
		count++;
	}
	return Promise.resolve([]);
};

export const DFS = "DFS";
