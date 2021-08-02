import Box from "./Box";
import styled from "styled-components";
import { useMatrixContext } from "../contexts/MatrixContext";

const Matrix = () => {
	const {
		matrix,
		handleMouseLeavingMatrix,
	} = useMatrixContext();
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
		width: 3vh;
		height: 3vh;
		background-color: lightgray;
		border: solid 1px white;
		white-space: nowrap;
	}

	.blink-bg {
		animation-name: blinkingBackground;
		animation-duration: 5s;
		animation-timing-function: ease;
		animation-iteration-count: 1;
		animation-direction: alternate;
		animation-fill-mode: both;
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
		20% {
			background-color: #ff9b85;
		}
		50% {
			background-color: #ffa990;
		}
		100% {
			background-color: #ffd97d;
		}
	}

	.weight {
		background-image: url("weightIcon.svg");
	}
	
`;

export default Matrix;
