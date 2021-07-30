import { checkIndexes, isEquals } from "../helpers";

export const bfs = async (matrix, start, end, changeValue) => {
	let queue = [];
	const push = (row, col) => {
		queue.push({ row, col });
	};

	const visitNeighbors = ({ row, col }) => {
		if (checkIndexes(matrix, row - 1, col)) {
			let cell = matrix[row - 1][col];
			if (cell.value === 0) {
				changeValue(row - 1, col, 3);
				cell.parent = { row, col };
				push(row - 1, col);
			}
		}
		if (checkIndexes(matrix, row + 1, col)) {
			let cell = matrix[row + 1][col];
			if (cell.value === 0) {
				changeValue(row+1, col, 3);
				cell.parent = { row, col };
				push(row + 1, col);
			}
		}
		if (checkIndexes(matrix, row, col + 1)) {
			let cell = matrix[row][col + 1];
			if (cell.value === 0) {
				changeValue(row, col+1, 3);
				cell.parent = { row, col };
				push(row, col + 1);
			}
		}
		if (checkIndexes(matrix, row, col - 1)) {
			let cell = matrix[row][col - 1];
			if (cell.value === 0) {
				changeValue(row, col-1, 3);
				cell.parent = { row, col };
				push(row, col - 1);
			}
		}
	};

	let begin = {
		row: start.row,
		col: start.col,
	};
	queue.push(begin);

	while (queue.length > 0) {
		let cell = queue.shift();
		if (isEquals(cell, end)) {
			let path = [];
			let parent = matrix[cell.row][cell.col].parent;
			while (!isEquals(parent, start)) {
				path.unshift(parent);
				parent = matrix[parent.row][parent.col].parent;
			}
			return Promise.resolve(path);
		}
		visitNeighbors(cell);
		await new Promise((resolve) => setTimeout(resolve, 0));
	}

	return Promise.resolve([]);
};

export const BFS = "BFS";
