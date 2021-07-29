import { checkIndexes, isEquals} from "../helpers";
import Heap from "heap";

export const dijkstra = async (matrix, start, end, changeValue, rows, cols) => {
	let heap = new Heap((a, b) => {
		return a.val - b.val;
	});
	let weightMatrix = [];
	for (let i = 0; i < rows; i++) {
		let arr = new Array(cols).fill(Infinity);
		weightMatrix.push(arr);
	}

	let count = 0;

	const push = (row, col, val) => {
		heap.push({ row, col, val });
	};

	const visitNeighbors = ({ row, col, val }) => {
		let weightSoFar = val;
		if (checkIndexes(matrix, row - 1, col)) {
			let currentCost = weightMatrix[row - 1][col];
			let cellCost = matrix[row - 1][col].weight;
			let min = Math.min(currentCost, weightSoFar + cellCost + 1);
			if (min < currentCost) {
				weightMatrix[row - 1][col] = min;
				push(row - 1, col, weightMatrix[row - 1][col]);
			}

			if (matrix[row - 1][col].value === 0) changeValue(row - 1, col, 2);
			else if (matrix[row - 1][col].value === 2)
				changeValue(row - 1, col, 3);
		}

		if (checkIndexes(matrix, row + 1, col)) {
			let currentCost = weightMatrix[row + 1][col];
			let cellCost = matrix[row + 1][col].weight;
			let min = Math.min(currentCost, weightSoFar + cellCost + 1);
			if (min < currentCost) {
				weightMatrix[row + 1][col] = min;
				push(row + 1, col, weightMatrix[row + 1][col]);
			}

			if (matrix[row + 1][col].value === 0) changeValue(row + 1, col, 2);
			else if (matrix[row + 1][col].value === 2)
				changeValue(row + 1, col, 3);
		}
		if (checkIndexes(matrix, row, col + 1)) {
			let currentCost = weightMatrix[row][col + 1];
			let cellCost = matrix[row][col + 1].weight;
			let min = Math.min(currentCost, weightSoFar + cellCost + 1);
			if (min < currentCost) {
				weightMatrix[row][col + 1] = min;
				push(row, col + 1, weightMatrix[row][col + 1]);
			}

			if (matrix[row][col + 1].value === 0) changeValue(row, col + 1, 2);
			else if (matrix[row][col + 1].value === 2)
				changeValue(row, col + 1, 3);
		}
		if (checkIndexes(matrix, row, col - 1)) {
			let currentCost = weightMatrix[row][col - 1];
			let cellCost = matrix[row][col - 1].weight;
			let min = Math.min(currentCost, weightSoFar + cellCost + 1);
			if (min < currentCost) {
				weightMatrix[row][col - 1] = min;
				push(row, col - 1, weightMatrix[row][col - 1]);
			}

			if (matrix[row][col - 1].value === 0) changeValue(row, col - 1, 2);
			else if (matrix[row][col - 1].value === 2)
				changeValue(row, col - 1, 3);
		}
	};

	const leastCostingNeighbor = (cell) => {
		let { row, col, val } = cell;
		let leastCell;
		if (checkIndexes(matrix, row - 1, col)) {
			let cVal = weightMatrix[row - 1][col];
			if (cVal < val) {
				val = cVal;
				leastCell = { row: row - 1, col, val };
			}
		}
		if (checkIndexes(matrix, row + 1, col)) {
			let cVal = weightMatrix[row + 1][col];
			if (cVal < val) {
				val = cVal;
				leastCell = { row: row + 1, col, val };
			}
		}
		if (checkIndexes(matrix, row, col - 1)) {
			let cVal = weightMatrix[row][col - 1];
			if (cVal < val) {
				val = cVal;
				leastCell = { row, col: col - 1, val };
			}
		}
		if (checkIndexes(matrix, row, col + 1)) {
			let cVal = weightMatrix[row][col + 1];
			if (cVal < val) {
				val = cVal;
				leastCell = { row, col: col + 1, val };
			}
		}
		return leastCell;
	};

	let begin = {
		row: start.row,
		col: start.col,
		val: 0,
	};
	weightMatrix[begin.row][begin.col] = begin.val;
	push(begin.row, begin.col, begin.val);

	let path = [];
	while (heap.size() > 0) {
		let cell = heap.pop();
		if (isEquals(cell, end)) {
			let it = cell;
			while (it) {
				path.unshift(it);
				it = leastCostingNeighbor(it);
			}
			path.pop();
			return Promise.resolve(path);
		}
		visitNeighbors(cell);
		if (count % 3 === 0) {
			await new Promise((resolve) => setTimeout(resolve, 0));
		}
		count++;
	}

	return Promise.resolve([]);
};

export const DIJ = "DIJ";
