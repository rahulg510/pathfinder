import heap from "heap";
import { isEquals, checkIndexes } from "../helpers";

export const gfs = async (matrix, start, end, changeValue,changeDone) => {
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
		if (checkIndexes(matrix, row - 1, col)) {
			let cell = matrix[row - 1][col];
			if (cell.value === 0) {
				cell.value = 2;
				cell.parent = { row, col };
				let cost = cell.weight + getHeuristic(row - 1, col);
				push(row - 1, col, cost);
			}
		}
		if (checkIndexes(matrix, row + 1, col)) {
			let cell = matrix[row + 1][col];
			if (cell.value === 0) {
				cell.value = 2;
				cell.parent = { row, col };
				let cost = cell.weight + getHeuristic(row + 1, col);
				push(row + 1, col, cost);
			}
		}
		if (checkIndexes(matrix, row, col + 1)) {
			let cell = matrix[row][col + 1];
			if (cell.value === 0) {
				cell.value = 2;
				cell.parent = { row, col };
				let cost = cell.weight + getHeuristic(row, col + 1);
				push(row, col + 1, cost);
			}
		}
		if (checkIndexes(matrix, row, col - 1)) {
			let cell = matrix[row][col - 1];
			if (cell.value === 0) {
				cell.value = 2;
				cell.parent = { row, col };
				let cost = cell.weight + getHeuristic(row, col - 1);
				push(row, col - 1, cost);
			}
		}
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
		if(element.weight > 0){
			changeDone(cell.row,cell.col, true);
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
		changeValue(cell.row, cell.col, 3);
		visitNeighbors(cell);
		await new Promise((r) => setTimeout(r, 0));
	}
	return Promise.resolve([]);
};

export const GFS = "GFS";
