import Box from "./Box";
import styled from "styled-components";
import OptionsBar from "./OptionsBar";
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
		height: 2vh;
		width: 2vh;
		background-color: lightgray;
		border: solid 1px white;
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
