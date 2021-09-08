import { NORMAL, WALL } from "../cellTypes";
import { isEquals } from "../helpers";

const randomNumber = (min = 0, max = 9) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const division = async (
	xStart,
	xEnd,
	yStart,
	yEnd,
	START,
	END,
	changeType,
	dir,
	changeWeight
) => {
	if (xEnd - xStart < 2 || yEnd - yStart < 2) return;
	if (dir === 0) {
		let verticleLine = Math.floor(randomNumber(xStart, xEnd - 1) / 2) * 2;
		for (let i = yStart; i < yEnd; i++) {
			if (
				!isEquals({ row: i, col: verticleLine }, START) &&
				!isEquals({ row: i, col: verticleLine }, END)
			) {
				if (randomNumber() % 7 === 0) {
					changeWeight(i, verticleLine, 15);
					changeType(i, verticleLine, NORMAL);
				} else {
					changeType(i, verticleLine, WALL);
					changeWeight(i, verticleLine, 0);
				}
				await new Promise((res) => setTimeout(res, 0));
			}
		}
		let pass = Math.floor(randomNumber(yStart, yEnd - 1) / 2) * 2 + 1;
		while (
			isEquals({ row: pass, col: verticleLine }, START) ||
			isEquals({ row: pass, col: verticleLine }, END)
		) {
			pass = Math.floor(randomNumber(yStart, yEnd - 1) / 2) * 2 + 1;
		}
		changeType(pass, verticleLine, NORMAL);
		changeWeight(pass, verticleLine, 0);
		await division(
			xStart,
			verticleLine,
			yStart,
			yEnd,
			START,
			END,
			changeType,
			1,
			changeWeight
		);
		await division(
			verticleLine + 1,
			xEnd,
			yStart,
			yEnd,
			START,
			END,
			changeType,
			1,
			changeWeight
		);
	} else {
		let horizontalLine = Math.floor(randomNumber(yStart, yEnd - 1) / 2) * 2;
		for (let i = xStart; i < xEnd; i++) {
			if (
				!isEquals({ row: horizontalLine, col: i }, START) &&
				!isEquals({ row: horizontalLine, col: i }, END)
			) {
				if (randomNumber() % 7 === 0) {
					changeWeight(horizontalLine, i, 15);
					changeType(horizontalLine, i, NORMAL);
				} else {
					changeType(horizontalLine, i, WALL);
					changeWeight(horizontalLine, i, 0);
				}

				await new Promise((res) => setTimeout(res, 0));
			}
		}
		let pass = Math.floor(randomNumber(xStart, xEnd - 1) / 2) * 2 + 1;
		while (
			isEquals({ row: horizontalLine, col: pass }, START) ||
			isEquals({ row: horizontalLine, col: pass }, END)
		) {
			pass = Math.floor(randomNumber(xStart, xEnd - 1) / 2) * 2 + 1;
		}
		changeType(horizontalLine, pass, NORMAL);
		changeWeight(horizontalLine, pass, 0);
		await division(
			xStart,
			xEnd,
			yStart,
			horizontalLine,
			START,
			END,
			changeType,
			0,
			changeWeight
		);
		await division(
			xStart,
			xEnd,
			horizontalLine + 1,
			yEnd,
			START,
			END,
			changeType,
			0,
			changeWeight
		);
	}
};

const createRecursiveDivisionWeightedMaze = async (
	matrix,
	start,
	end,
	changeType,
	changeWeight
) => {
	let dir = Math.floor(Math.random() * 100) % 2 === 0 ? 0 : 1;
	await division(
		0,
		matrix[0].length,
		0,
		matrix.length,
		start,
		end,
		changeType,
		dir,
		changeWeight
	);
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[0].length; j++) {
			if (
				matrix[i][j].type !== WALL &&
				randomNumber(1, 99) % 33 === 0 &&
				!isEquals({ row: i, col: j }, start) &&
				!isEquals({ row: i, col: j }, end)
			) {
				changeWeight(i, j, 15);
				changeType(i,j,NORMAL);
				await new Promise((res) => setTimeout(res, 0));
			}
		}
	}
};

export default createRecursiveDivisionWeightedMaze;
