import { checkIndexes, isEquals, NEIGHBORS } from "../helpers";
import Heap from "heap";

export const biDijkstra = async (
	matrix,
	start,
	end,
	changeValue,
	changeDone
) => {
	let heap = new Heap((a, b) => {
		return a.val - b.val;
	});
	let endHeap = new Heap((a, b) => {
		return a.val - b.val;
	});

	const push = (row, col, val, endSide) => {
		if (!endSide) heap.push({ row, col, val });
		else endHeap.push({ row, col, val });
	};

	let minimumPath = Infinity;
	let connectingCell = null;
	let startSideValues = new Map();
	let endSideValues = new Map();
	let startSideDone = new Map();
    let endSideDone = new Map();
    let startSideParent = new Map();
    let endSideParent = new Map();

	const visitEndSideNeighbors = ({ row, col }) => {
		let costSoFar = endSideValues.get(`r:${row},c:${col}`);
		NEIGHBORS.forEach((neighbor) => {
			let r = row + neighbor[0];
			let c = col + neighbor[1];
			if (
				checkIndexes(matrix, r, c) &&
				!endSideDone.has(`r:${r},c:${c}`)
			) {
				let cell = matrix[r][c];
				let newCost = costSoFar + cell.weight + 1;
				let curCost = endSideValues.get(`r:${r},c:${c}`);
				if (curCost === undefined || newCost < curCost) {
					endSideValues.set(`r:${r},c:${c}`, newCost);
					changeValue(r, c, newCost);
					endSideParent.set(`r:${r},c:${c}`,{ row, col });
					push(r, c, newCost, true);
				}
			}
		});
	};

	const visitNeighbors = ({ row, col }) => {
		let costSoFar = startSideValues.get(`r:${row},c:${col}`);
		NEIGHBORS.forEach((neighbor) => {
			let r = row + neighbor[0];
			let c = col + neighbor[1];
			if (
				checkIndexes(matrix, r, c) &&
				!startSideDone.has(`r:${r},c:${c}`)
			) {
				let cell = matrix[r][c];
				let newCost = costSoFar + cell.weight + 1;
				let curCost = startSideValues.get(`r:${r},c:${c}`);
				if (curCost === undefined || newCost < curCost) {
					startSideValues.set(`r:${r},c:${c}`, newCost);
					changeValue(r, c, newCost);
					startSideParent.set(`r:${r},c:${c}`,{ row, col });
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

	let destination = {
		row: end.row,
		col: end.col,
		val: 0,
	};

	push(begin.row, begin.col, begin.val);
	push(destination.row, destination.col, destination.val, true);
	startSideValues.set(`r:${begin.row},c:${begin.col}`, 0);
	endSideValues.set(`r:${destination.row},c:${destination.col}`, 0);

	let count = 0;
	while (heap.size() > 0 && endHeap.size() > 0) {
		let cell = heap.peek();
		startSideDone.set(`r:${cell.row},c:${cell.col}`, true);
		let endSideCell = endHeap.peek();
		endSideDone.set(`r:${endSideCell.row},c:${endSideCell.col}`, true);

		let bool = 
			endSideParent.has(`r:${cell.row},c:${cell.col}`) || 
			startSideParent.has(`r:${endSideCell.row},c:${endSideCell.col}`);
		if (bool) {
			while (heap.size() > 0 || endHeap.size() > 0) {
				let c = heap.pop();
				if (c) {
					let cMat = matrix[c.row][c.col];
					if (endSideParent.has(`r:${c.row},c:${c.col}`)) {
                        let pathLength = startSideValues.get(`r:${c.row},c:${c.col}`) + endSideValues.get(`r:${c.row},c:${c.col}`) - cMat.weight;
                        if(pathLength < minimumPath){
                            minimumPath = pathLength;
                            connectingCell = c;
                        }
					}
				}
				let eC = endHeap.pop();
				if (eC) {
					let eCMat = matrix[eC.row][eC.col];
					if (startSideParent.has(`r:${eC.row},c:${eC.col}`)) {
                        let pathLength = startSideValues.get(`r:${eC.row},c:${eC.col}`) + endSideValues.get(`r:${eC.row},c:${eC.col}`) - eCMat.weight;
                        if(pathLength < minimumPath){
                            minimumPath = pathLength;
                            connectingCell = eC;
                        }
					}
                }
			}
		} else {
			heap.pop();
			endHeap.pop();
			if (matrix[cell.row][cell.col].weight > 0) {
				changeDone(cell.row, cell.col, true);
			}
			visitNeighbors(cell);

			if (matrix[endSideCell.row][endSideCell.col].weight > 0) {
				changeDone(endSideCell.row, endSideCell.col, true);
			}
			visitEndSideNeighbors(endSideCell, true);
		}
		if (count % 2 === 0)
			await new Promise((resolve) => setTimeout(resolve, 0));

		count++;
	}

	let path = [];
	if (connectingCell) {
		let parent =
			startSideParent.get(`r:${connectingCell.row},c:${connectingCell.col}`);
		while (!isEquals(parent, start)) {
			path.unshift(parent);
            parent = startSideParent.get(`r:${parent.row},c:${parent.col}`);
		}
		path.push(connectingCell);
		parent = endSideParent.get(`r:${connectingCell.row},c:${connectingCell.col}`);
		while (!isEquals(parent, end)) {
			path.push(parent);
			parent = endSideParent.get(`r:${parent.row},c:${parent.col}`);
		}
	}
	return Promise.resolve(path);
};
