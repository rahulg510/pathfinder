import { isEquals, validIndex } from "../helpers";
import Heap from "heap";

export const dijkstra = async (matrix, start, end, changeValue, rows, cols, changeMatrix) => {
	// let heap = new Heap((a));
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
		if (validIndex(matrix, row - 1, col)) {
			let currentCost = weightMatrix[row - 1][col];
			let cellCost = matrix[row - 1][col];
			if (cellCost === 15) {
				weightMatrix[row - 1][col] = Math.min(
					currentCost,
					weightSoFar + cellCost + 1
				);
			} else {
				weightMatrix[row - 1][col] = Math.min(
					currentCost,
					weightSoFar + 1
				);
				if (matrix[row - 1][col] === 0) changeValue(row - 1, col, 2);
				else if (matrix[row - 1][col] === 2) changeValue(row - 1, col, 3);
			}
			push(row - 1, col, weightMatrix[row - 1][col]);
		}
		if (validIndex(matrix, row + 1, col)) {
			let currentCost = weightMatrix[row + 1][col];
			let cellCost = matrix[row + 1][col];
			if (cellCost === 15) {
				weightMatrix[row + 1][col] = Math.min(
					currentCost,
					weightSoFar + cellCost + 1
				);
			} else {
				weightMatrix[row + 1][col] = Math.min(
					currentCost,
					weightSoFar + 1
				);
				if (matrix[row + 1][col] === 0) changeValue(row + 1, col, 2);
				else if (matrix[row + 1][col] === 2) changeValue(row + 1, col, 3);
			}
			push(row + 1, col, weightMatrix[row + 1][col]);
		}
		if (validIndex(matrix, row, col + 1)) {
			let currentCost = weightMatrix[row][col + 1];
			let cellCost = matrix[row][col + 1];
			if (cellCost === 15) {
				weightMatrix[row][col + 1] = Math.min(
					currentCost,
					weightSoFar + cellCost + 1
				);
			} else {
				weightMatrix[row][col + 1] = Math.min(
					currentCost,
					weightSoFar + 1
				);
				if (matrix[row][col + 1] === 0) changeValue(row, col + 1, 2);
				else if (matrix[row][col + 1] === 2) changeValue(row, col + 1, 3);
			}
			push(row, col + 1, weightMatrix[row][col + 1]);
		}
		if (validIndex(matrix, row, col - 1)) {
			let currentCost = weightMatrix[row][col - 1];
			let cellCost = matrix[row][col - 1];
			if (cellCost === 15) {
				weightMatrix[row][col - 1] = Math.min(
					currentCost,
					weightSoFar + cellCost + 1
				);
			} else {
				weightMatrix[row][col - 1] = Math.min(
					currentCost,
					weightSoFar + 1
				);
				if (matrix[row][col - 1] === 0) changeValue(row, col - 1, 2);
				else if (matrix[row][col - 1] === 2) changeValue(row, col - 1, 3);
			}
			push(row, col - 1, weightMatrix[row][col - 1]);
		}
	};

	const leastCostingNeighbor = (cell) => {
		const {row,col} = cell;
		let val = cell.val;
		let leastCell;
		if(validIndex(row-1, col)){
			let cVal = weightMatrix[row-1][col];
			if(cVal < val){
				leastCell = {row:row-1, col};
				val = cVal;
			}
		}
		if(validIndex(row+1, col)){
			let cVal = weightMatrix[row+1][col];
			if(cVal < val){
				leastCell = {row:row+1, col};
				val = cVal;
			}
		}
		if(validIndex(row, col-1)){
			let cVal = weightMatrix[row][col-1];
			if(cVal < val){
				leastCell = {row,col: col-1};
				val = cVal;
			}
		}
		if(validIndex(row, col+1)){
			let cVal = weightMatrix[row][col+1];
			if(cVal < val){
				leastCell = {row, col: col+1};
				val = cVal;
			}
		}
		return leastCell;
	}

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
			let it = end;
			while(it){
				// console.log('end');
				// if(isEquals(it,start)){
					
				// 	path.pop();
				// }
				path.unshift(it);
				it = leastCostingNeighbor(it);
			}
			return Promise.resolve(path);
		}
		console.log("visiting still")
		visitNeighbors(cell);

		if (count % 3 === 0) {
			await new Promise((resolve) => setTimeout(resolve, 0));
		}
		count++;
	}

	return Promise.resolve([]);
};

export const DIJ = "DIJ";
