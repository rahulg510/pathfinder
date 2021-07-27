import { isEquals, checkIndexes } from "../helpers";

export const bfs = async (matrix, start, end, changeValue) => {
	let queue = [];
	let count = 0;

	const push = (r, c, path) => {
		queue.push({ row: r, col: c, path });
	};

	const visitNeighbors = ({ row, col, path }) => {
		if (checkIndexes(matrix, row - 1, col)) {
			if (!isEquals({ row: row - 1, col }, end)) {
				matrix[row - 1][col] = 2;
			}
			push(row - 1, col, [...path, { row: row - 1, col }]);
		}
		if (checkIndexes(matrix, row + 1, col)) {
			if (!isEquals({ row: row + 1, col }, end)) {
				matrix[row + 1][col] = 2;
			}
			push(row + 1, col, [...path, { row: row + 1, col }]);
		}
		if (checkIndexes(matrix, row, col + 1)) {
			if (!isEquals({ row, col: col + 1 }, end)) {
				matrix[row][col + 1] = 2;
			}
			push(row, col + 1, [...path, { row, col: col + 1 }]);
		}
		if (checkIndexes(matrix, row, col - 1)) {
			if (!isEquals({ row, col: col - 1 }, end)) {
				matrix[row][col - 1] = 2;
			}
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
			cell.path.pop();
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

export const BFS = "BFS";
