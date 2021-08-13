import { isEquals, checkIndexes, NEIGHBORS } from "../helpers";
import heap from "heap";

export const aStar = async (matrix, start, end, changeValue, changeDone) => {
	const pQueue = new heap((a, b) => {
		return a.cost - b.cost;
	});

	const push = (row, col, cost) => {
		pQueue.insert({ row, col, cost });
	};

	const getHeuristic = (row, col) => {
		return Math.abs(end.row - row) + Math.abs(end.col - col);
	};

	const visitNeighbors = ({ row, col }) => {
		let costSoFar = matrix[row][col].value;
		NEIGHBORS.forEach((neighbor) => {
			let r = row + neighbor[0];
			let c = col + neighbor[1];
			if (checkIndexes(matrix, r, c)) {
				let cell = matrix[r][c];
				let newCost = costSoFar + cell.weight + 1;
				if (cell.value === 0 || newCost < cell.value) {
					changeValue(r, c, newCost);
					cell.parent = { row, col };
					let cost = newCost + getHeuristic(r, c);
					push(r, c, cost);
				}
			}
		});
	};

	let begin = {
		row: start.row,
		col: start.col,
		cost: 0,
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
