import heap from "heap";
import { isEquals, checkIndexes, NEIGHBORS } from "../helpers";

export const gfs = async (matrix, start, end, changeValue, changeDone) => {
	const pQueue = new heap((a, b) => {
		return a.val - b.val;
	});

	const push = (row, col, val) => {
		pQueue.insert({ row, col, val });
	};

	const getHeuristic = (row, col) => {
		return Math.abs(end.row - row) + Math.abs(end.col - col);
	};


	const visitNeighbors = ({ row, col }) => {
		NEIGHBORS.forEach((neighbor) => {
			let r = row + neighbor[0];
			let c = col + neighbor[1];
			if (checkIndexes(matrix, r, c)) {
				let cell = matrix[r][c];
				if (cell.value === 0) {
					changeValue(r, c, 2);
					cell.parent = { row, col };
					let cost = cell.weight + getHeuristic(r, c) + 1;
					push(r, c, cost);
				}
			}
		});
	};

	let begin = {
		row: start.row,
		col: start.col,
		val: 0,
	};

	pQueue.insert(begin);

	while (pQueue.size() > 0) {
		let cell = pQueue.pop();
		let element = matrix[cell.row][cell.col];
		if (element.weight > 0) {
			changeDone(cell.row, cell.col, true);
		}
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
		await new Promise((r) => setTimeout(r, 0));
	}
	return Promise.resolve([]);
};
