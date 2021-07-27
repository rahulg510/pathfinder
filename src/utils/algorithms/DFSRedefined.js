import { isEquals, checkIndexes } from "../helpers";

export const dfs = async (matrix, start, end, changeValue) => {
	let stack = [];
	let parents = new Map();

	const push = (row, col, parent) => {
		let obj = { row, col };
		parents.set(obj, parent);
		stack.push(obj);
	};

	const visitNeighbors = (cell) => {
		let { row, col } = cell;

		if (checkIndexes(matrix, row + 1, col)) {
			push(row + 1, col, cell);
			return 1;
		}
		if (checkIndexes(matrix, row - 1, col)) {
			push(row - 1, col, cell);
			return 1;
		}
		if (checkIndexes(matrix, row, col + 1)) {
			push(row, col + 1, cell);
			return 1;
		}
		if (checkIndexes(matrix, row, col - 1)) {
			push(row, col - 1, cell);
			return 1;
		} else return 0;
	};

	let begin = {
		row: start.row,
		col: start.col,
	};
	parents.set(begin, null);
	stack.push(begin);

	let path = [];
	while (stack.length > 0) {
		let cell = stack.pop();
		if (isEquals(cell, end)) {
			let parent = parents.get(cell);
			while (parent) {
				path.unshift(parent);
				parent = parents.get(parent);
			}
			return Promise.resolve(path);
		}
		if (!isEquals(start, cell)) {
			changeValue(cell.row, cell.col, 2);
		}

		let ans = visitNeighbors(cell);
		if (ans === 0) {
			changeValue(cell.row, cell.col, 3);
			let parent = parents.get(cell);
			if (parent) stack.push(parent);
			else return Promise.resolve([]);
		}

		await new Promise((resolve) => setTimeout(resolve, 0));
	}
	return Promise.resolve([]);
};

export const DFS = "DFS";
