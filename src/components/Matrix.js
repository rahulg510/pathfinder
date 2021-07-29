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
		stopRunningAlogrithm
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
			<div className="table" onMouseLeave={handleMouseLeavingMatrix} onDragStart={(e)=>e.preventDefault()}>
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
		width: 3vh;
		background-color: lightgray;
		border: solid 1px white;
	}

	.blink-bg{
		animation-name: blinkingBackground;
		animation-duration: 2s;
		animation-timing-function: ease;
		animation-iteration-count: 2;
		animation-direction: alternate;
		animation-fill-mode: both;
		animation-play-state: running;
	}
	@keyframes blinkingBackground{
		0%		{ background-color: #FF9B85;}
		0%		{ background-color: #FFA990;}
		100%		{ background-color: #FFD97D;}
	}

	.table {
		display: table;
		border: ridge 4px #aaaaaa;
		margin: auto;
		margin-top: 7vh;
	}

	.row {
		display: table-row;
	}

	.cell {
		display: table-cell;
	}

	.movingStart{
		color: seagreen !important;
	}
	
`;

export default Matrix;
