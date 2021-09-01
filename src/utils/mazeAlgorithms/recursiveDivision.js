import { NORMAL, WALL } from "../cellTypes";
import { isEquals } from "../helpers";

const randomNumber = (min, max) => {
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
	dir
) => {
	if (xEnd - xStart < 2 || yEnd - yStart < 2) return;
	if (dir === 0) {
		let verticleLine = Math.floor(randomNumber(xStart, xEnd - 1) / 2) * 2;
		for (let i = yStart; i < yEnd; i++) {
			if (
				!isEquals({ row: i, col: verticleLine }, START) &&
				!isEquals({ row: i, col: verticleLine }, END)
			) {
				changeType(i, verticleLine, WALL);
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
		await division(xStart, verticleLine, yStart, yEnd, START, END, changeType, 1);
		await division(
			verticleLine + 1,
			xEnd,
			yStart,
			yEnd,
			START,
			END,
			changeType,
			1
		);
	} else {
		let horizontalLine = Math.floor(randomNumber(yStart, yEnd - 1) / 2) * 2;
		for (let i = xStart; i < xEnd; i++) {
			if (
				!isEquals({ row: horizontalLine, col: i }, START) &&
				!isEquals({ row: horizontalLine, col: i }, END)
			) {
				changeType(horizontalLine, i, WALL);
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
		await division(
			xStart,
			xEnd,
			yStart,
			horizontalLine,
			START,
			END,
			changeType,
			0
		);
		await division(
			xStart,
			xEnd,
			horizontalLine + 1,
			yEnd,
			START,
			END,
			changeType,
			0
		);
	}
};

const createRecursiveDivisionMaze = async (matrix, start, end, changeType) => {
	let dir = Math.floor(Math.random() * 100) % 2 === 0 ? 0 : 1;
	await division(
		0,
		matrix[0].length,
		0,
		matrix.length,
		start,
		end,
		changeType,
		dir
	);
};

export default createRecursiveDivisionMaze;
