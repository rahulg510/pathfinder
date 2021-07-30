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
		changeAlgorithm,
		weight,
		handleWeightClick,
	} = useMatrixContext();

	return (
		<Wrapper>
			<nav className="navbar">
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
					className={`${weight ? "selected" : null}`}
					onClick={handleWeightClick}
				>
					Add Weight
				</button>
				<button
					disabled={status === RUNNING}
					className={`${erase ? "selected" : null}`}
					onClick={handleEraseClick}
				>
					Erase
				</button>
				<select
					disabled={status === RUNNING}
					onChange={(e) => changeAlgorithm(e.target.value)}
				>
					<option value="BFS">Breadth First Search</option>
					<option value="DFS">Depth First Search</option>
					<option value="DIJ">Dijkstra's Algorithm</option>
					<option value="GFS">Greedy First Search</option>
					<option value="ASTAR">A*</option>
				</select>
			</nav>
			<h2>{status === RUNNING ? "Running" : "Ready"}</h2>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.selected {
		background-color: lightblue;
	}

	.navbar {
		background-color: #333;
		overflow: hidden;
	}

	.navbar select,
	.navbar button,
	.navbar option {
		float: left;
		background: none;
		color: #f2f2f2;
		text-align: center;
		padding: 14px 16px;
		font-size: 16px;
	}

	.navbar button:hover,
	select:hover {
		background-color: #3bbc73;
		color: black;
	}

	.hover {
		background-color: #3bbc73;
		color: black;
	}

	.navbar button:disabled {
		background-color: #ddd;
		color: black;
	}
`;

export default OptionsBar;
