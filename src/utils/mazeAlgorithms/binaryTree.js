import { NORMAL, WALL } from "../cellTypes";

const northOrWest = (i, j) => {
	let top = i > 0;
	let left = j > 0;
	if (top && left) {
		let ran = Math.floor(Math.random() * 100) % 2;
		return ran === 0 ? 1 : 2;
	}
	if (!top && !left) return 0;
	if (!top) return 2;
	if (!left) return 1;
};

const createBinaryTreeMaze = async (matrix, start, end, changeType) => {
	const R = matrix.length,
		C = matrix[0].length;

	for (let i = 0; i < R; i++) {
		for (let j = 0; j < C; j++) {
			let bool =
				(i === start.row && j === start.col) ||
				(i === end.row && j === end.col);
			if (!bool) {
				changeType(i, j, WALL);
			}
		}
	}

	for (let i = 0; i < R; i++) {
		for (let j = 0; j < C; j++) {
			let dir = northOrWest(i, j);
			if (dir === 1) {
				let bool =
					(i - 1 === start.row && j === start.col) ||
					(i - 1 === end.row && j === end.col);
				if (!bool) {
					changeType(i - 1, j, NORMAL);
				}
			} else if (dir === 2) {
				let bool =
					(i === start.row && j - 1 === start.col) ||
					(i === end.row && j - 1 === end.col);
				if (!bool) {
					changeType(i, j - 1, NORMAL);
				}
            }
            await new Promise(res=>setTimeout(res,0));
		}
	}
};

export default createBinaryTreeMaze;
