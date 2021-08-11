import { useMatrixContext } from "../contexts/MatrixContext";
import { END, NORMAL, PATH, START, WALL } from "../utils/cellTypes";
import { STOPPED } from "../utils/status";
import { useState, useEffect } from "react";
import { isEquals, getClass } from "../utils/helpers";
import styled from "styled-components";
import * as constants from "../utils/cellConstants";

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
				oldColor = e.target.style["backgroundColor"];
				if (!isEquals({ row, col }, end))
					e.target.style["backgroundColor"] = constants.START_COLOR;
			} else if (endMove) {
				oldColor = e.target.style["backgroundColor"];
				if (!isEquals({ row, col }, start))
					e.target.style["backgroundColor"] = constants.END_COLOR;
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
			e.target.style["backgroundColor"] = oldColor;
		}
	};


	const getColor = () => {
		let color = constants.DEFAULT_COLOR;
		if (cell.weight > 0) {
			if (cell.type === PATH) {
				color = constants.WEIGHT_PATH;
			} else
				color = cell.done
					? constants.WEIGHT_DONE
					: constants.WEIGHT_COLOR;
		} else
			switch (cell.type) {
				case START:
					color = constants.START_COLOR;
					break;
				case END:
					color = constants.END_COLOR;
					break;
				case WALL:
					color = constants.WALL_COLOR;
					break;
				case PATH:
					color = constants.PATH_COLOR;
					break;
				case NORMAL:
					if (cell.value !== 0) {
						color = constants.FOURTH_ANIMATION_COLOR;
					}
					break;
				default:
					color = constants.DEFAULT_COLOR;
					break;
			}
		return color;
	};
	return (
		<Wrapper
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			className={getClass(cell, status)}
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
