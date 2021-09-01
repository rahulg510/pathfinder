import heap from "heap";
import { isEquals, checkIndexes, NEIGHBORS } from "../helpers";

export const biAStar = async (matrix, start, end, changeValue, changeDone) => {
	const forwardQueue = new heap((a, b) => {
		return a.cost - b.cost;
	});

	const backwardQueue = new heap((a, b) => {
		return a.cost - b.cost;
	});

	let forwardParents = new Map();
	let backwardParents = new Map();
	let forwardCosts = new Map();
	let backwardCosts = new Map();

	const push = (row, col, cost, forward) => {
		if (forward) forwardQueue.insert({ row, col, cost });
		else backwardQueue.insert({ row, col, cost });
	};

	const getHeuristic = (m, n) => {
		return Math.abs(n.row - m.row) + Math.abs(n.col - m.col);
	};

	const visitForwardNeighbors = () => {
		let curNode = forwardQueue.pop();
		if (matrix[curNode.row][curNode.col].weight > 0) {
			changeDone(curNode.row, curNode.col, true);
		}
		let { row, col } = curNode;
		let costSoFar = forwardCosts.get(`r:${row},c:${col}`);

		let otherNode = backwardQueue.peek();
		if (otherNode) {
			NEIGHBORS.forEach((neighbor) => {
				let r = row + neighbor[0];
				let c = col + neighbor[1];
				if (checkIndexes(matrix, r, c)) {
					let cell = matrix[r][c];
					let newCost = costSoFar + cell.weight + 1;
					let cellValue = forwardCosts.get(`r:${r},c:${c}`);
					if (cellValue === undefined || newCost < cellValue) {
						changeValue(r, c, newCost);
						forwardCosts.set(`r:${r},c:${c}`, newCost);
						forwardParents.set(`r:${r},c:${c}`, { row, col });
						let cost =
							newCost +
							getHeuristic({ row: r, col: c }, otherNode) +
							backwardCosts.get(
								`r:${otherNode.row},c:${otherNode.col}`
							);
						push(r, c, cost, true);
					}
				}
			});
		}
	};

	const visitBackwardNeighbors = () => {
		let curNode = backwardQueue.pop();
		if (matrix[curNode.row][curNode.col].weight > 0) {
			changeDone(curNode.row, curNode.col, true);
		}
		let { row, col } = curNode;
		let costSoFar = backwardCosts.get(`r:${row},c:${col}`);
		let otherNode = forwardQueue.peek();
		if (otherNode) {
			NEIGHBORS.forEach((neighbor) => {
				let r = row + neighbor[0];
				let c = col + neighbor[1];
				if (checkIndexes(matrix, r, c)) {
					let cell = matrix[r][c];
					let newCost = costSoFar + cell.weight + 1;
					let cellValue = backwardCosts.get(`r:${r},c:${c}`);
					if (cellValue === undefined || newCost < cellValue) {
						changeValue(r, c, newCost);
						backwardCosts.set(`r:${r},c:${c}`, newCost);
						backwardParents.set(`r:${r},c:${c}`, { row, col });
						let cost =
							newCost +
							getHeuristic({ row: r, col: c }, otherNode) +
							forwardCosts.get(
								`r:${otherNode.row},c:${otherNode.col}`
							);
						push(r, c, cost, false);
					}
				}
			});
		}
	};

	let begin = {
		row: start.row,
		col: start.col,
		cost: 0,
	};

	let destination = {
		row: end.row,
		col: end.col,
		cost: 0,
	};

	let connected = false;
	let connectingCell = null;
	let shortestPathLength = Infinity;
	forwardQueue.insert(begin);
	backwardQueue.insert(destination);
	forwardCosts.set(`r:${begin.row},c:${begin.col}`, 0);
	backwardCosts.set(`r:${destination.row},c:${destination.col}`, 0);

	while (forwardQueue.size() > 0 && backwardQueue.size() > 0) {
		let cell = forwardQueue.peek();
		let backwardCell = backwardQueue.peek();
		if (backwardParents.has(`r:${cell.row},c:${cell.col}`)) {
			connected = true;
			let pathLength =
				forwardCosts.get(`r:${cell.row},c:${cell.col}`) +
				backwardCosts.get(`r:${cell.row},c:${cell.col}`);
			if (pathLength < shortestPathLength) {
				connectingCell = cell;
				shortestPathLength = pathLength;
			}
		}
		if (forwardParents.has(`r:${backwardCell.row},c:${backwardCell.col}`)) {
			connected = true;
			let pathLength =
				forwardCosts.get(
					`r:${backwardCell.row},c:${backwardCell.col}`
				) +
				backwardCosts.get(
					`r:${backwardCell.row},c:${backwardCell.col}`
				);
			if (pathLength < shortestPathLength) {
				shortestPathLength = pathLength;
				connectingCell = backwardCell;
			}
		}
		if (isEquals(cell, backwardCell) || connected) {
			while (forwardQueue.size() > 0) {
				let c = forwardQueue.pop();
				let pathLength =
					forwardCosts.get(`r:${c.row},c:${c.col}`) +
					backwardCosts.get(`r:${c.row},c:${c.col}`);
				if (pathLength < shortestPathLength) {
					shortestPathLength = pathLength;
					connectingCell = c;
				}
			}

			while (backwardQueue.size() > 0) {
				let c = backwardQueue.pop();
				let pathLength =
					forwardCosts.get(`r:${c.row},c:${c.col}`) +
					backwardCosts.get(`r:${c.row},c:${c.col}`);
				if (pathLength < shortestPathLength) {
					shortestPathLength = pathLength;
					connectingCell = c;
				}
			}

			let path = [];
			let parent = forwardParents.get(
				`r:${connectingCell.row},c:${connectingCell.col}`
			);
			while (!isEquals(parent, start)) {
				path.unshift(parent);
				parent = forwardParents.get(`r:${parent.row},c:${parent.col}`);
			}
			path.push(connectingCell);

			parent = backwardParents.get(
				`r:${connectingCell.row},c:${connectingCell.col}`
			);
			while (!isEquals(parent, end)) {
				path.push(parent);
				parent = backwardParents.get(`r:${parent.row},c:${parent.col}`);
			}
			return Promise.resolve(path);
		}

		visitForwardNeighbors();
		visitBackwardNeighbors();
		await new Promise((r) => setTimeout(r, 0));
	}
	return Promise.resolve([]);
};
