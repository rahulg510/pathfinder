import Box from "./Box";
import styled from "styled-components";
import OptionsBar from "./OptionsBar";
import { useEffect, useState } from "react";

const Matrix = () => {
	const ROWS = 30;
	const COLS = 30;
	const START = [0, 0];
	const END = [ROWS - 1, COLS - 1];
	let initialMatrix = localStorage.getItem("matrix");
	if (initialMatrix) {
		initialMatrix = JSON.parse(initialMatrix);
	} else {
		initialMatrix = createNewMatrix();
	}
	const [matrix, setMatrix] = useState(initialMatrix);
	const [clicked, setClicked] = useState(false);

	function createNewMatrix(rows = ROWS, cols = COLS) {
		let newMatrix = [];
		for (let i = 0; i < rows; i++) {
			newMatrix.push(new Array(cols).fill(0));
		}
		newMatrix[START[0]][START[1]] = -100;
		newMatrix[END[0]][END[1]] = 100;
		return newMatrix;
	}

	const changeValue = (r, c, val) => {
		if (START[0] === c && START[1] === r) return;
		if (END[0] === c && END[1] === r) return;
		matrix[r][c] = val;
		setMatrix([...matrix]);
	};

	const resetMatrix = () => {
		let newMatrix = createNewMatrix();
		setMatrix(newMatrix);
	};

	useEffect(() => {
		localStorage.setItem("matrix", JSON.stringify(matrix));
	});
	return (
		<Wrapper>
			<OptionsBar resetMatrix={resetMatrix} />
			<div className="flex">
				{matrix.map((arr, row) => {
					return (
						<div key={row}>
							{arr.map((i, col) => {
								return (
									<Box
										key={`r${row}c${col}`}
										row={row}
										col={col}
										changeValue={changeValue}
										val={i}
										clicked={clicked}
										setClicked={setClicked}
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
		border: solid 1px black;
	}
	.flex {
		width: 80vw;
		height: 80vw;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.visited {
		background-color: blueviolet;
	}
`;

export default Matrix;
