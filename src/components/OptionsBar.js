import { useReducer } from "react";
import styled from "styled-components";

const OptionsBar = ({
	resetMatrix,
	runAlgorithm,
	clearMatrix,
	handleEraseClick,
	erase,
	stopRunningAlogrithm
}) => {
	return (
		<Wrapper>
			<button onClick={resetMatrix}>Reset</button>
			<button onClick={runAlgorithm}>Start</button>
			<button onClick={stopRunningAlogrithm}>Stop</button>
			<button onClick={clearMatrix}>Clear Grid</button>
			<button
				className={`${erase ? "selected" : null}`}
				onClick={handleEraseClick}
			>
				Erase
			</button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.selected {
		background-color: lightblue;
	}
`;

export default OptionsBar;
