import Box from "./Box";
import styled from "styled-components";
import { useMatrixContext } from "../contexts/MatrixContext";

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
		border-collapse: collapse;
	}

	.row {
		display: table-row;
	}

	.cell {
		display: table-cell;
		height: 3vh;
		max-height: 3vh;
		max-width: 3vh;
		background-color: lightgray;
		border: solid 1px lightgray;
		white-space: nowrap;
	}

	.blink-bg {
		animation-name: blinkingBackground;
		animation-duration: 3s;
		animation-iteration-count: 1;
		animation-direction: normal;
		animation-fill-mode: forwards;
		animation-play-state: running;
	}
	.blink-bg-stopped {
		animation-name: blinkingBackground;
		animation-duration: 3s;
		animation-timing-function: ease;
		animation-iteration-count: 1;
		animation-direction: alternate;
		animation-fill-mode: both;
		animation-play-state: paused;
	}
	@keyframes blinkingBackground {
		0% {
			background-color: #ff9b85;
			text-align: center;
			transform: scale(.3);

		}
		25% {
			background-color: #e1b382;
			text-align: center;
			transform: scale(.5);
		}
		50% {
			background-color: #ffa990;
			text-align: center;
			transform: scale(1.3);
		}
		100% {
			background-color: #ffd97d;
		}
	}

	.wall {
		border-color: yellow;
		background-image: url("wallIcon.svg");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.weight {
		border-color: deepskyblue;
		background-image: url("weightIcon1.svg");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.start {
		background-image: url("startIcon.svg");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}

	.end {
		background-image: url("endIcon.svg");
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
`;

export default Matrix;
