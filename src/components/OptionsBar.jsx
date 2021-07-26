import styled from "styled-components";
import { useMatrixContext } from "../contexts/MatrixContext";
import { RUNNING } from "../utils/status";

const OptionsBar = () => {
	const {
		resetMatrix,
		runAlgorithm,
		clearMatrix,
		handleEraseClick,
		erase,
		status,
		changeAlgorithm
	} = useMatrixContext();

	return (
		<Wrapper>
			<button disabled={status === RUNNING} onClick={resetMatrix}>
				Clear Walls
			</button>
			<button disabled={status === RUNNING} onClick={runAlgorithm}>
				Start
			</button>
			<button disabled={status === RUNNING} onClick={clearMatrix}>
				Clear Path
			</button>
			<button
				disabled={status === RUNNING}
				className={`${erase ? "selected" : null}`}
				onClick={handleEraseClick}
			>
				Erase
			</button>
			<select onChange={(e) => changeAlgorithm(e.target.value)}>
				<option value="BFS">Breadth First Search</option>
				<option value="DFS">Depth First Search</option>
			</select>
			<h2>{status===RUNNING ? "Running" : "Ready"}</h2>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.selected {
		background-color: lightblue;
	}
`;

export default OptionsBar;
