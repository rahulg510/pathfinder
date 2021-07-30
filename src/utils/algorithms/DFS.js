import { isEquals, checkIndexes } from "../helpers";

export const dfs = async (matrix, start, end, changeValue) => {
	let stack = [];
	const push = (row, col) => {
		stack.push({ row, col });
	};

	const visitNeighbors = (node) => {
		let { row, col } = node;
		if (checkIndexes(matrix, row, col - 1)) {
			let cell = matrix[row][col - 1];
			if (cell.value === 0) {
				push(row, col - 1);
				matrix[row][col - 1].parent = node;
			}
		}
		if (checkIndexes(matrix, row, col + 1)) {
			let cell = matrix[row][col + 1];
			if (cell.value === 0) {
				push(row, col + 1);
				matrix[row][col + 1].parent = node;
			}
		}
		if (checkIndexes(matrix, row - 1, col)) {
			let cell = matrix[row - 1][col];
			if (cell.value === 0) {
				push(row - 1, col);
				matrix[row - 1][col].parent = node;
			}
		}
		if (checkIndexes(matrix, row + 1, col)) {
			let cell = matrix[row + 1][col];
			if (cell.value === 0) {
				push(row + 1, col);
				matrix[row + 1][col].parent = node;
			}
		}
	};

	let begin = {
		row: start.row,
		col: start.col,
	};
	stack.push(begin);

	while (stack.length > 0) {
		let cell = stack.pop();
		if (isEquals(cell, end)) {
			let path = [];
			let parent = matrix[cell.row][cell.col].parent;
			while (!isEquals(parent, start)) {
				path.unshift(parent);
				parent = matrix[parent.row][parent.col].parent;
			}
			return Promise.resolve(path);
		}
		let val = matrix[cell.row][cell.col].value;
		if (val === 0) {
			changeValue(cell.row, cell.col, 2);
			await new Promise((resolve) => setTimeout(resolve, 0));
		}
		visitNeighbors(cell);
	}
	return Promise.resolve([]);
};

export const DFS = "DFS";
