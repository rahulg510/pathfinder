// import { checkIndexes, isEquals } from "../helpers";
// import Heap from "heap";

// export const biDijkstra = async (
// 	matrix,
// 	start,
// 	end,
// 	changeValue,
// 	changeDone,
// 	immediate = false
// ) => {
// 	let heap = new Heap((a, b) => {
// 		return a.val - b.val;
// 	});
// 	let endHeap = new Heap((a, b) => {
// 		return a.val - b.val;
// 	});

// 	const push = (row, col, val, endSide) => {
// 		if (!endSide) heap.push({ row, col, val });
// 		else endHeap.push({ row, col, val });
// 	};

// 	let endSideParents = new Map();
// 	let done = false;
// 	let connectingCell = null;

// 	const visitEndSideNeighbors = ({ row, col }) => {
// 		let costSoFar = matrix[row][col].value;
// 		if (checkIndexes(matrix, row - 1, col)) {
// 			let cell = matrix[row - 1][col];
// 			let newCost = costSoFar + cell.weight + 1;
// 			if (cell.value === 0 || newCost < cell.value) {
// 				changeValue(row - 1, col, newCost);
// 				cell.parent = { row, col };
// 				push(row - 1, col, newCost);
// 			}
// 		}
// 		if (checkIndexes(matrix, row, col + 1)) {
// 			let cell = matrix[row][col + 1];
// 			let newCost = costSoFar + cell.weight + 1;
// 			if (cell.value === 0 || newCost < cell.value) {
// 				changeValue(row, col + 1, newCost);
// 				cell.parent = { row, col };
// 				push(row, col + 1, newCost);
// 			}
// 		}

// 		if (checkIndexes(matrix, row + 1, col)) {
// 			let cell = matrix[row + 1][col];
// 			let newCost = costSoFar + cell.weight + 1;
// 			if (cell.value === 0 || newCost < cell.value) {
// 				changeValue(row + 1, col, newCost);
// 				cell.parent = { row, col };
// 				push(row + 1, col, newCost);
// 			}
// 		}
// 		if (checkIndexes(matrix, row, col - 1)) {
// 			let cell = matrix[row][col - 1];
// 			let newCost = costSoFar + cell.weight + 1;
// 			if (cell.value === 0 || newCost < cell.value) {
// 				changeValue(row, col - 1, newCost);
// 				cell.parent = { row, col };
// 				push(row, col - 1, newCost);
// 			}
// 		}
// 	};

// 	const visitNeighbors = ({ row, col }) => {
// 		let costSoFar = matrix[row][col].value;
// 		if (checkIndexes(matrix, row - 1, col)) {
// 			let cell = matrix[row - 1][col];
// 			let newCost = costSoFar + cell.weight + 1;
// 			if (cell.value === 0 || newCost < cell.value) {
// 				changeValue(row - 1, col, newCost);
// 				cell.parent = { row, col };
// 				push(row - 1, col, newCost);
// 			}
// 		}
// 		if (checkIndexes(matrix, row, col + 1)) {
// 			let cell = matrix[row][col + 1];
// 			let newCost = costSoFar + cell.weight + 1;
// 			if (cell.value === 0 || newCost < cell.value) {
// 				changeValue(row, col + 1, newCost);
// 				cell.parent = { row, col };
// 				push(row, col + 1, newCost);
// 			}
// 		}

// 		if (checkIndexes(matrix, row + 1, col)) {
// 			let cell = matrix[row + 1][col];
// 			let newCost = costSoFar + cell.weight + 1;
// 			if (cell.value === 0 || newCost < cell.value) {
// 				changeValue(row + 1, col, newCost);
// 				cell.parent = { row, col };
// 				push(row + 1, col, newCost);
// 			}
// 		}
// 		if (checkIndexes(matrix, row, col - 1)) {
// 			let cell = matrix[row][col - 1];
// 			let newCost = costSoFar + cell.weight + 1;
// 			if (cell.value === 0 || newCost < cell.value) {
// 				changeValue(row, col - 1, newCost);
// 				cell.parent = { row, col };
// 				push(row, col - 1, newCost);
// 			}
// 		}
// 	};

// 	let begin = {
// 		row: start.row,
// 		col: start.col,
// 		val: 0,
// 	};

// 	let destination = {
// 		row: end.row,
// 		col: end.col,
// 		val: 0,
// 	};

// 	push(begin.row, begin.col, begin.val);
// 	push(destination.row, destination.col, destination.val, true);
// 	let count = 0;
// 	while (heap.size() > 0 && endHeap.size() > 0) {
// 		let cell = heap.pop();
// 		let endSideCell = endHeap.pop();
// 		if (cell) {
// 			let element = matrix[cell.row][cell.col];
// 			if (element.weight > 0) {
// 				changeDone(cell.row, cell.col, true);
// 			}
// 			visitNeighbors(cell);
// 		}
// 		if (endSideCell) {
// 			let element = matrix[endSideCell.row][endSideCell.col];
// 			if (element.weight > 0) {
// 				changeDone(endSideCell.row, endSideCell.col, true);
// 			}
// 			visitNeighbors(endSideCell, true);
// 		}

// 		await new Promise((resolve) => setTimeout(resolve, 0));
// 	}

// 	return Promise.resolve([]);
// };
