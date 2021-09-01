import heap from "heap";
import { isEquals, checkIndexes, NEIGHBORS } from "../helpers";

export const biGreedyFirstSearch = async (
	matrix,
	start,
	end,
	changeValue,
	changeDone
) => {
	const forwardQueue = new heap((a, b) => {
		return a.cost - b.cost;
	});

	const backwardQueue = new heap((a, b) => {
		return a.cost - b.cost;
	});

	let forwardParents = new Map();
	let backwardParents = new Map();

	const push = (row, col, cost, forward) => {
		if (forward) forwardQueue.insert({ row, col, cost });
		else backwardQueue.insert({ row, col, cost });
	};

	const getHeuristic = (m, n) => {
		return Math.abs(n.row - m.row) + Math.abs(n.col - m.col);
	};

	const visitForwardNeighbors = () => {
		let curNode = forwardQueue.pop();
		let { row, col } = curNode;
		if (matrix[row][col].weight > 0) {
			changeDone(row, col, true);
		}
		let otherNode = backwardQueue.peek();
		if (otherNode) {
			NEIGHBORS.forEach((neighbor) => {
				let r = row + neighbor[0];
				let c = col + neighbor[1];
				if (checkIndexes(matrix, r, c)) {
					if (!forwardParents.has(`r:${r},c:${c}`)) {
						let cell = matrix[r][c];
						let cost = cell.weight + 1;
						changeValue(r, c, cost);
						forwardParents.set(`r:${r},c:${c}`, { row, col });
						push(
							r,
							c,
							cost + getHeuristic({ row: r, col: c }, otherNode),
							true
						);
					}
				}
			});
		}
	};

	const visitBackwardNeighbors = () => {
		let curNode = backwardQueue.pop();
		let { row, col } = curNode;
		if (matrix[row][col].weight > 0) {
			changeDone(row, col, true);
		}
		let otherNode = forwardQueue.peek();
		if (otherNode) {
			NEIGHBORS.forEach((neighbor) => {
				let r = row + neighbor[0];
				let c = col + neighbor[1];
				if (checkIndexes(matrix, r, c)) {
					if (!backwardParents.has(`r:${r},c:${c}`)) {
						let cell = matrix[r][c];
						let cost = cell.weight + 1;
						changeValue(r, c, cost);
						backwardParents.set(`r:${r},c:${c}`, { row, col });
						push(
							r,
							c,
							cost + getHeuristic({ row: r, col: c }, otherNode),
							false
						);
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

	forwardQueue.insert(begin);
	backwardQueue.insert(destination);

	while (forwardQueue.size() > 0 && backwardQueue.size() > 0) {
		let cell = forwardQueue.peek();
		let backwardCell = backwardQueue.peek();
		if (backwardParents.has(`r:${cell.row},c:${cell.col}`)) {
			connected = true;
			connectingCell = cell;
		}
		if (forwardParents.has(`r:${backwardCell.row},c:${backwardCell.col}`)) {
			connected = true;
			connectingCell = cell;
		}
		if (isEquals(cell, backwardCell) || connected) {
			let path = [];
			let parent = forwardParents.get(
				`r:${connectingCell.row},c:${connectingCell.col}`
			);
			while (!isEquals(parent, start)) {
				path.unshift(parent);
				parent = forwardParents.get(`r:${parent.row},c:${parent.col}`);
			}
			path.push(cell);

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
