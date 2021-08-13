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
					cell.parent.endSide = { row, col };
					push(r, c, newCost, true);

					if (cell.parent.startSide) {
						let totalCost =
							costSoFar +
							startSideValues.get(`r:${r},c:${c}`) +
							1;
						if (
							startSideDone.has(`r:${r},c:${c}`) &&
							totalCost < minimumPath
						) {
							minimumPath = totalCost;
							connectingCell = { row: r, col: c };
						}
					}
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
					cell.parent.startSide = { row, col };
					push(r, c, newCost);
					if (cell.parent.endSide) {
						let totalCost =
							costSoFar + endSideValues.get(`r:${r},c:${c}`) + 1;
						if (
							endSideDone.has(`r:${r},c:${c}`) &&
							totalCost < minimumPath
						) {
							minimumPath = totalCost;
							connectingCell = { row: r, col: c };
						}
					}
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
		let cell = heap.pop();
		startSideDone.set(`r:${cell.row},c:${cell.col}`, true);
		let endSideCell = endHeap.pop();
        endSideDone.set(`r:${endSideCell.row},c:${endSideCell.col}`, true);
        let bool = endSideDone.has(`r:${cell.row},c:${cell.col}`) || startSideDone.has(`r:${endSideCell.row},c:${endSideCell.col}`);
		if (bool) {
            while(heap.size() > 0 || endHeap.size() > 0)
			if(endSideDone.has(`r:${cell.row},c:${cell.col}`)){

            }
            if(startSideDone.has(`r:${endSideCell.row},c:${endSideCell.col}`){

            }
		}
        else{
            if (matrix[cell.row][cell.col].weight > 0) {
                changeDone(cell.row, cell.col, true);
            }
            visitNeighbors(cell);
    
            if (matrix[endSideCell.row][endSideCell.col].weight > 0) {
                changeDone(endSideCell.row, endSideCell.col, true);
            }
            visitEndSideNeighbors(endSideCell, true);
        }
		if (count % 3 === 0)
			await new Promise((resolve) => setTimeout(resolve, 0));

		count++;
	}

	let path = [];
	if (connectingCell) {
		let parent =
			matrix[connectingCell.row][connectingCell.col].parent.startSide;
		while (!isEquals(parent, start)) {
			path.unshift(parent);
			parent = matrix[parent.row][parent.col].parent.startSide;
		}
		path.push(connectingCell);
		parent = matrix[connectingCell.row][connectingCell.col].parent.endSide;
		while (!isEquals(parent, end)) {
			path.push(parent);
			parent = matrix[parent.row][parent.col].parent.endSide;
		}
	}
	return Promise.resolve(path);
};
