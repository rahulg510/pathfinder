import { checkIndexes, isEquals } from "../helpers";
import Heap from "heap";

export const dijkstra = async (
	matrix,
	start,
	end,
	changeValue,
	changeDone,
	immediate = false
) => {
	let heap = new Heap((a, b) => {
		return a.val - b.val;
	});

	const push = (row, col, val) => {
		heap.push({ row, col, val });
	};

	const visitNeighbors = ({ row, col }) => {
		let costSoFar = matrix[row][col].value;
		if (checkIndexes(matrix, row - 1, col)) {
			let cell = matrix[row - 1][col];
			let newCost = costSoFar + cell.weight + 1;
			if (cell.value === 0 || newCost < cell.value) {
				changeValue(row - 1, col, newCost);
				cell.parent = { row, col };
				push(row - 1, col, newCost);
			}
		}
		if (checkIndexes(matrix, row, col + 1)) {
			let cell = matrix[row][col + 1];
			let newCost = costSoFar + cell.weight + 1;
			if (cell.value === 0 || newCost < cell.value) {
				changeValue(row, col + 1, newCost);
				cell.parent = { row, col };
				push(row, col + 1, newCost);
			}
		}

		if (checkIndexes(matrix, row + 1, col)) {
			let cell = matrix[row + 1][col];
			let newCost = costSoFar + cell.weight + 1;
			if (cell.value === 0 || newCost < cell.value) {
				changeValue(row + 1, col, newCost);
				cell.parent = { row, col };
				push(row + 1, col, newCost);
			}
		}
		if (checkIndexes(matrix, row, col - 1)) {
			let cell = matrix[row][col - 1];
			let newCost = costSoFar + cell.weight + 1;
			if (cell.value === 0 || newCost < cell.value) {
				changeValue(row, col - 1, newCost);
				cell.parent = { row, col };
				push(row, col - 1, newCost);
			}
		}
	};

	let begin = {
		row: start.row,
		col: start.col,
		val: 0,
	};
	push(begin.row, begin.col, begin.val);
	let count = 0;
	while (heap.size() > 0) {
		let cell = heap.pop();
		let element = matrix[cell.row][cell.col];
		if (element.weight > 0) {
			changeDone(cell.row, cell.col, true);
		}
		if (isEquals(cell, end)) {
			let path = [];
			let parent = element.parent;
			while (!isEquals(parent, start)) {
				path.unshift(parent);
				parent = matrix[parent.row][parent.col].parent;
			}
			return Promise.resolve(path);
		}
		visitNeighbors(cell);
		if (count % 3 === 0)
			await new Promise((resolve) => setTimeout(resolve, 0));
		count++;
	}

	return Promise.resolve([]);
};
