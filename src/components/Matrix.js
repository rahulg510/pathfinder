import Box from "./Box";
import styled from "styled-components";
import { useMatrixContext } from "../contexts/MatrixContext";
import * as constants from "../utils/cellConstants";
const Matrix = () => {
	const { matrix, handleMouseLeavingMatrix } = useMatrixContext();
	return (
		<Wrapper>
			<div
				className="table"
				onMouseLeave={handleMouseLeavingMatrix}
				onDragStart={(e) => e.preventDefault()}
			>
				{matrix.map((arr, row) => {
					return (
						<div className="row" key={row}>
							{arr.map((i, col) => {
								return (
									<Box
										key={`r${row}c${col}`}
										row={row}
										col={col}
									></Box>
								);
							})}
						</div>
					);
				})}
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.table {
		display: table;
		table-layout: fixed;
		/* width: fit-content; */
		margin: auto;
		margin-top: 1vh;
		margin-bottom: 1vh;
		border-collapse: collapse;
	}

	.row {
		display: table-row;
	}

	.cell {
		display: table-cell;
		height: 4vh;
		border: solid 1px ${constants.CELL_BORDER};
		white-space: nowrap;
	}

	.blink-bg {
		animation-name: blinkingBackground;
		animation-duration: 2s;
		animation-iteration-count: 1;
		animation-direction: alternate;
		animation-fill-mode: both;
		animation-play-state: running;
	}
	.blink-bg-stopped {
		animation-name: blinkingBackground;
		animation-fill-mode: forwards;
		animation-play-state: paused;
	}
	@keyframes blinkingBackground {
		0% {
			background-color: ${constants.FIRST_ANIMATION_COLOR};
			text-align: center;
			transform: scale(.1);
			opacity:0.5;
			border-radius: 50%;
		}
		25% {
			background-color: ${constants.SECOND_ANIMATION_COLOR};
			text-align: center;
			transform: scale(.5);
			opacity:0.8;
			border-radius: 30%;

		}
		50% {
			background-color: ${constants.THIRD_ANIMATION_COLOR};
			text-align: center;
			transform: scale(1.2);
		}
		100% {
			background-color: ${constants.FOURTH_ANIMATION_COLOR};
		}

	}

	.wall {
		border-color: ${constants.WALL_COLOR};
		background-image: url(${constants.WALL_IMG});
		background-size: cover;
		background-repeat: no-repeat;
		background-position: center;
	}

	.weight {
		border-color: ${constants.WEIGHT_COLOR};
		background-image: url(${constants.WEIGHT_IMG});
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.start {
		background-image: url(${constants.START_IMG});
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.end {
		background-image: url(${constants.END_IMG});
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
`;

export default Matrix;
