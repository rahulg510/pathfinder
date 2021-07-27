import { useMatrixContext } from "../contexts/MatrixContext";
import { END, NORMAL, PATH, START, WALL } from "../utils/cellTypes";
import { STOPPED } from "../utils/status";
import { useState } from "react";
const Box = ({ row, col, val }) => {
	const {
		mouseDown,
		handleMouseUpDown,
		handleStartMove,
		handleEndMove,
		startMove,
		endMove,
		changeStart,
		changeEnd,
		weight,
		status,
		changeWeight,
		changeType,
		matrix,
	} = useMatrixContext();

	const handleMouseDown = () => {
		let cell = matrix[row][col];
		if (status === STOPPED) {
			handleMouseUpDown(true);
			if (cell.type === START) {
				handleStartMove(true);
				changeType(row, col, NORMAL);
			} else if (cell.type === END) {
				handleEndMove(true);
				changeType(row, col, NORMAL);
			} else if (weight) {
				if (cell.type === NORMAL || cell.type === PATH)
					changeWeight(row, col, cell.weight === 1 ? 15 : 1);
			} else {
				if (cell.type === NORMAL || cell.type === PATH) {
					changeType(row, col, WALL);
				} else if (cell.type === WALL) changeType(row, col, NORMAL);
			}
		}
	};

	const handleMouseUp = () => {
		if (status === STOPPED) {
			handleMouseUpDown(false);
			if (startMove) {
				changeType(row, col, START);
				changeStart(row, col);
				handleStartMove(false);
			} else if (endMove) {
				changeType(row, col, END);
				changeEnd(row, col);
				handleEndMove(false);
			}
		}
	};

	let oldColor;
	const handleMouseOver = (r, c, e) => {
		let cell = matrix[r][c];
		if (status === STOPPED) {
			if (startMove) {
				oldColor = e.target.style["background-color"];
				e.target.style["background-color"] = "seagreen";
			} else if (endMove) {
				oldColor = e.target.style["background-color"];
				e.target.style["background-color"] = "#FF4136";
			} else {
				if (mouseDown) {
					if (weight) {
						if (cell.type === NORMAL || cell.type === PATH)
							changeWeight(row, col, cell.weight === 1 ? 15 : 1);
					} else {
						if (cell.type === NORMAL || cell.type === PATH) {
							changeType(row, col, WALL);
						} else if (cell.type === WALL)
							changeType(row, col, NORMAL);
					}
				}
			}
		}
	};

	const handleMouseLeave = (e) => {
		if (status === STOPPED) {
			e.target.style["background-color"] = oldColor;
		}
	};

	const getColor = (cell) => {
		let color = "";
		if (cell.weight > 1) {
			color = "deepskyblue";
		} else if (cell.type === NORMAL) {
			switch (cell.value) {
				case 2:
					color = "#FFDC00";
					break;
				case 3:
					color = "lightsalmon";
					break;
				default:
					color = "#DDDDDD";
					break;
			}
		} else {
			switch (cell.type) {
				case WALL:
					color = "#001F3F";
					break;
				case START:
					color = "seagreen";
					break;
				case END:
					color = "#FF4136";
					break;
				case PATH:
					color = "#01FF70";
					break;
				default:
					color = "#DDDDDD";
					break;
			}
		}
		return color;
	};
	return (
		<div
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			className="box cell"
			style={{
				backgroundColor: getColor(matrix[row][col]),
				transition: "all .5s linear",
			}}
			onMouseOver={(e) => handleMouseOver(row, col, e)}
			onMouseLeave={(e) => handleMouseLeave(e)}
		></div>
	);
};

export default Box;
