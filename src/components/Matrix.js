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
		border: solid 1px white;
		white-space: nowrap;
	}

	.wall {
		border-color: #001f3f;
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
		animation-duration: 5s;
		animation-timing-function: ease;
		animation-iteration-count: 1;
		animation-direction: alternate;
		animation-fill-mode: both;
		animation-play-state: paused;
	}
	@keyframes blinkingBackground {
		0% {
			background-color: #ff9b85;
			rotate: 90;
		}
		50% {
			background-color: #ffa990;
			border-radius: 25%;

		}
		100% {
			background-color: #ffd97d;
			border-radius: 0%;

		}
	}

	.weight {
		border-color: deepskyblue;
		background-image: url("weightIcon.svg");
	}
`;

export default Matrix;
