import heap from "heap";
import { isEquals, checkIndexes } from "../helpers";

export const aStar = async (matrix, start, end, changeValue,changeDone) => {
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

		if (checkIndexes(matrix, row - 1, col)) {
			let cell = matrix[row - 1][col];
			let newCost = costSoFar + cell.weight + 1;
			if (cell.value === 0 || newCost < cell.value) {
				changeValue(row - 1, col, newCost);
				cell.parent = { row, col };
				let cost = newCost + getHeuristic(row - 1, col);
				push(row - 1, col, cost);
			}
		}
		if (checkIndexes(matrix, row + 1, col)) {
			let cell = matrix[row + 1][col];
			let newCost = costSoFar + cell.weight + 1;
			if (cell.value === 0 || newCost < cell.value) {
				changeValue(row + 1, col, newCost);
				cell.parent = { row, col };
				let cost = newCost + getHeuristic(row + 1, col);
				push(row + 1, col, cost);
			}
		}
		if (checkIndexes(matrix, row, col + 1)) {
			let cell = matrix[row][col + 1];
			let newCost = costSoFar + cell.weight + 1;
			if (cell.value === 0 || newCost < cell.value) {
				changeValue(row, col + 1, newCost);
				cell.parent = { row, col };
				let cost = newCost + getHeuristic(row, col + 1);
				push(row, col + 1, cost);
			}
		}
		if (checkIndexes(matrix, row, col - 1)) {
			let cell = matrix[row][col - 1];
			let newCost = costSoFar + cell.weight + 1;
			if (cell.value === 0 || newCost < cell.value) {
				changeValue(row, col - 1, newCost);
				cell.parent = { row, col };
				let cost = newCost + getHeuristic(row, col - 1);
				push(row, col - 1, cost);
			}
		}
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
		visitNeighbors(cell);
		await new Promise((r) => setTimeout(r, 0));
	}
	return Promise.resolve([]);
};

export const ASTAR = "ASTAR";
