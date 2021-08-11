import { WALL } from "../cellTypes";

const createRandomMazeWeighted = (
	matrix,
	start,
	end,
	changeType,
	changeWeight
) => {
    for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[0].length; j++) {
			let num = Math.random() * 100;
			let endPoints =
				(i === start.row && j === start.col) ||
				(i === end.row && j === end.col);
			if (!endPoints) {
				if (num < 15) {
					changeType(i, j, WALL);
				} else if (num >= 60 && num < 70) {
					changeWeight(i, j, 15);
				}
			}
		}
	}
};

export default createRandomMazeWeighted;
