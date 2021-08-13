import { isEquals, checkIndexes, NEIGHBORS } from "../helpers";

export const dfs = async (matrix, start, end, changeValue) => {
	let stack = [];
	const push = (row, col) => {
		stack.push({ row, col });
	};

	const visitNeighbors = (node) => {
		let { row, col } = node;
		NEIGHBORS.forEach((neighbor) => {
			let r = row + neighbor[0];
			let c = col + neighbor[1];
			if (checkIndexes(matrix, r, c)) {
				let cell = matrix[r][c];
				if (cell.value === 0) {
					push(r, c);
					matrix[r][c].parent = node;
				}
			}
		});
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
