import {isEquals, checkIndexes} from "../helpers"
import { RUNNING } from "../status";
export const BFS = "BFS";
export const Bfs = async (matrix, start, end, changeValue, state) => {
	let queue = [];
	let count = 0;

	const push = (r, c, path) => {
		queue.push({ row: r, col: c, path });
	};

	const visitNeighbors = ({ row, col, path }) => {
		if (checkIndexes(matrix, row - 1, col)) {
			matrix[row - 1][col] = 2;
			push(row - 1, col, [...path, { row: row - 1, col }]);
		}
		if (checkIndexes(matrix, row + 1, col)) {
			matrix[row + 1][col] = 2;
			push(row + 1, col, [...path, { row: row + 1, col }]);
		}
		if (checkIndexes(matrix, row, col + 1)) {
			matrix[row][col + 1] = 2;
			push(row, col + 1, [...path, { row, col: col + 1 }]);
		}
		if (checkIndexes(matrix, row, col - 1)) {
			matrix[row][col - 1] = 2;
			push(row, col - 1, [...path, { row, col: col - 1 }]);
		}
	};

	let begin = {
		row: start.row,
		col: start.col,
		path: [],
	};
	queue.push(begin);

	while (queue.length > 0) {
		let cell = queue.shift();
		if (isEquals(cell, end)) {
			let c = cell.path.pop();
			matrix[c.row][c.col] = 1000;
			return Promise.resolve(cell.path);
		}
		visitNeighbors(cell);
		if (!isEquals(cell, start)) changeValue(cell.row, cell.col, 3);

		if (count % 3 === 0) {
			await new Promise((resolve) => setTimeout(resolve, 0));
		}
		count++;
	}

	return Promise.resolve([]);
};

export default BFS;
