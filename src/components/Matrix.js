import Box from "./Box";
import styled from "styled-components";
import OptionsBar from "./OptionsBar.jsx";
import { useMatrixContext } from "../contexts/MatrixContext";

const Matrix = () => {
	const {
		matrix,
		resetMatrix,
		runAlgorithm,
		clearMatrix,
		handleMouseLeavingMatrix,
		erase,
		handleEraseClick,
		stopRunningAlogrithm,
	} = useMatrixContext();
	return (
		<Wrapper>
			<OptionsBar
				resetMatrix={resetMatrix}
				runAlgorithm={runAlgorithm}
				clearMatrix={clearMatrix}
				erase={erase}
				handleEraseClick={handleEraseClick}
				stopRunningAlogrithm={stopRunningAlogrithm}
			/>
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
										val={i}
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
	.box {
		height: 3vh;
		width: 3.2vh;
		background-color: lightgray;
		border: solid 1px white;
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

	.table {
		display: table;
		/* border: ridge 2px #aaaaaa */
		margin: auto;
	}

	.row {
		display: table-row;
	}

	.cell {
		display: table-cell;
	}
`;

export default Matrix;
