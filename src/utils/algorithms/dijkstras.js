import { checkIndexes, isEquals, NEIGHBORS } from "../helpers";
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
		let dif =  a.val - b.val;
		if(dif === 0){
			return a.count - b.count;
		}
		return dif;
	});

	let insertCount = 0;

	const push = (row, col, val) => {
		heap.push({ row, col, val, count: insertCount++ });
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
					push(r, c, newCost);
				}
			}
		});
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
		if (count % 5 === 0)
			await new Promise((resolve) => setTimeout(resolve, 0));
		count++;
	}

	return Promise.resolve([]);
};
