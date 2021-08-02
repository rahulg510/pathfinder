import { useMatrixContext } from "../contexts/MatrixContext";
import { END, NORMAL, PATH, START, WALL } from "../utils/cellTypes";
import { RUNNING, STOPPED } from "../utils/status";
import { useState, useEffect } from "react";
import { isEquals } from "../utils/helpers";
import styled from "styled-components";

const Box = ({ row, col }) => {
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
		start,
		end,
		changeDone,
		changeValue,
	} = useMatrixContext();

	const [cell, setCell] = useState(matrix[row][col]);

	useEffect(() => {
		setCell(matrix[row][col]);
	}, [row, col, matrix]);

	const handleMouseDown = () => {
		if (status === STOPPED) {
			handleMouseUpDown(true);
			if (cell.type === START) {
				handleStartMove(true);
				changeType(row, col, NORMAL);
			} else if (cell.type === END) {
				handleEndMove(true);
				changeType(row, col, NORMAL);
			} else if (weight) {
				if (
					cell.type === NORMAL ||
					cell.type === WALL ||
					cell.type === PATH
				)
					changeType(row, col, NORMAL);
				changeWeight(row, col, cell.weight === 0 ? 15 : 0);
			} else {
				if (cell.type === NORMAL || cell.type === PATH) {
					changeType(row, col, WALL);
					changeWeight(row, col, 0);
				} else if (cell.type === WALL) changeType(row, col, NORMAL);
			}
		}
	};

	const handleMouseUp = (e) => {
		handleMouseUpDown(false);
		if (status === STOPPED) {
			if (startMove) {
				if (isEquals({ row, col }, end)) {
					changeType(start.row, start.col, START);
				} else {
					changeType(row, col, START);
					changeWeight(row, col, 0);
					changeValue(row, col, 0);
					changeDone(row, col, 0);
					changeStart(row, col);
				}
				handleStartMove(false);
			} else if (endMove) {
				if (isEquals({ row, col }, start)) {
					changeType(end.row, end.col, END);
				} else {
					changeType(row, col, END);
					changeWeight(row, col, 0);
					changeValue(row, col, 0);
					changeDone(row, col, 0);
					changeEnd(row, col);
				}
				handleEndMove(false);
			}
		}
	};

	let oldColor;
	const handleMouseOver = (row, col, e) => {
		if (status === STOPPED) {
			if (startMove) {
				oldColor = e.target.style["background-color"];
				if (!isEquals({ row, col }, end))
					e.target.style["background-color"] = "seagreen";
			} else if (endMove) {
				oldColor = e.target.style["background-color"];
				if (!isEquals({ row, col }, start))
					e.target.style["background-color"] = "#FF4136";
			} else {
				if (mouseDown) {
					if (weight) {
						if (
							cell.type === NORMAL ||
							cell.type === WALL ||
							cell.type === PATH
						) {
							changeWeight(row, col, cell.weight === 0 ? 15 : 0);
							changeType(row, col, NORMAL);
						}
					} else {
						if (cell.type === NORMAL || cell.type === PATH) {
							changeType(row, col, WALL);
							changeWeight(row, col, 0);
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

	const getClass = () => {
		let cellClass = "cell";
		if (cell.weight === 15) {
			cellClass += " weight";
		} else if (cell.type === WALL) {
			cellClass += " wall";
		} else if (cell.type === START) {
			cellClass += " start";
		} else if (cell.type === END) {
			cellClass += " end";
		} else
			cellClass +=
				cell.value > 0 && cell.type !== PATH
					? status === RUNNING
						? " blink-bg"
						: " blink-bg-stopped"
					: "";
		return cellClass;
	};

	const getColor = () => {
		let color = "";
		if (cell.weight > 0) {
			if (cell.type === PATH) {
				color = "#74B652";
			} else color = cell.done ? "purple" : "deepskyblue";
		} else
			switch (cell.type) {
				case START:
					color = "lightgreen";
					break;
				case END:
					color = "#FF4136";
					break;
				case WALL:
					// color = "#001F3F";
					color = "yellow"
					break;
				case PATH:
					color = "#01FF70";
					break;
				default:
					color = "#DDDDDD";
					break;
			}
		return color;
	};
	return (
		<Wrapper
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			className={getClass()}
			style={{
				backgroundColor: getColor(),
			}}
			onMouseOver={(e) => handleMouseOver(row, col, e)}
			onMouseLeave={(e) => handleMouseLeave(e)}
		></Wrapper>
	);
};

const Wrapper = styled.div``;
export default Box;
