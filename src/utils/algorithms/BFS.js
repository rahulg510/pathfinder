import { checkIndexes, isEquals, NEIGHBORS } from "../helpers";

export const bfs = async (matrix, start, end, changeValue) => {
	let queue = [];
	const push = (row, col) => {
		queue.push({ row, col });
	};

	const visitNeighbors = ({ row, col }) => {
		NEIGHBORS.forEach((neighbor) => {
			let r = row + neighbor[0];
			let c = col + neighbor[1];
			if (checkIndexes(matrix, r, c)) {
				let cell = matrix[r][c];
				if (cell.value === 0) {
					changeValue(r, c, 3);
					cell.parent = { row, col };
					push(r, c);
				}
			}
		});
	};

	let begin = {
		row: start.row,
		col: start.col,
	};
	queue.push(begin);
	let count = 0;
	while (queue.length > 0) {
		let cell = queue.shift();
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
		if (count % 5 === 0)
			await new Promise((resolve) => setTimeout(resolve, 0));
		count++;
	}

	return Promise.resolve([]);
};
