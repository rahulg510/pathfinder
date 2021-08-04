/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import { useMatrixContext } from "../contexts/MatrixContext";
import { RUNNING } from "../utils/status";
import "../utils/algorithms/algorithms";
import { ASTAR, BFS, DFS, DIJ, GFS } from "../utils/algorithms/algorithms";
import {
	RANDOM_MAZE,
	RANDOM_MAZE_WEIGHTED,
} from "../utils/mazeAlgorithms/mazeAlgorithms";
import { WEIGHT_COLOR } from "../utils/cellConstants";
import { useAlert } from "react-alert";
const OptionsBar = () => {
	const {
		resetMatrix,
		clearMatrix,
		status,
		changeAlgorithm,
		weight,
		handleWeightClick,
		currentAlgorithm,
		runAlgorithm,
		createMaze,
	} = useMatrixContext();
	const alert = useAlert();

	// const [alertAlgos, setAlertAlgos] = useState(false);

	const handleStart = async () => {
		if (currentAlgorithm) runAlgorithm();
		else {
			alert.error("Pick an Algorithm");
		}
	};

	return (
		<Wrapper>
			<nav
				className={`${
					status === RUNNING
						? "navbar navbar-expand-lg navbar-light alerting"
						: "navbar navbar-expand-lg navbar-light"
				}`}
			>
				<div className="container-fluid">
					<a className="navbar-brand" href="/">
						<img src="weightIcon.svg" width="30" alt="site logo" />
						Pathfinder
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavDarkDropdown"
						aria-controls="navbarNavDarkDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div
						className="collapse navbar-collapse"
						id="navbarNavDarkDropdown"
					>
						<ul className="navbar-nav">
							<li className="nav-item">
								<button
									disabled={status === RUNNING}
									onClick={resetMatrix}
									style={{ textAlign: "center" }}
								>
									Clear Everything
								</button>
							</li>
							<li className="nav-item">
								<button
									disabled={status === RUNNING}
									onClick={clearMatrix}
								>
									Clear Path
								</button>
							</li>
							<li className="nav-item dropdown">
								<button
									disabled={status === RUNNING}
									className="nav-link dropdown-toggle"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									id="mazeDropdown"
								>
									Mazes
								</button>
								<ul
									className="dropdown-menu bg-light"
									aria-labelledby="mazeDropdown"
								>
									<li>
										<button
											className="dropdown-item"
											onClick={(e) =>
												createMaze(RANDOM_MAZE)
											}
										>
											Basic Maze
										</button>
									</li>
									<li>
										<button
											className="dropdown-item"
											onClick={(e) =>
												createMaze(RANDOM_MAZE_WEIGHTED)
											}
										>
											Basic Maze Weighted
										</button>
									</li>
								</ul>
							</li>
							<li className="nav-item dropdown" id="algoHolder">
								<button
									disabled={status === RUNNING}
									className="nav-link dropdown-toggle"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									id="algoDropdown"
								>
									{currentAlgorithm || "Algorithms"}
								</button>
								<ul
									className="dropdown-menu bg-light"
									aria-labelledby="algoDropdown"
								>
									<li>
										<button
											className="dropdown-item"
											onClick={(e) =>
												changeAlgorithm(BFS)
											}
										>
											Breadth-First Search
										</button>
									</li>
									<li>
										<button
											className="dropdown-item"
											onClick={(e) =>
												changeAlgorithm(DFS)
											}
										>
											Depth-First Search
										</button>
									</li>
									<li>
										<button
											className="dropdown-item"
											onClick={(e) =>
												changeAlgorithm(DIJ)
											}
										>
											Dijkstra's Algorithm
										</button>
									</li>
									<li>
										<button
											className="dropdown-item"
											onClick={(e) =>
												changeAlgorithm(GFS)
											}
										>
											Greedy-First Search
										</button>
									</li>
									<li>
										<button
											className="dropdown-item"
											onClick={(e) =>
												changeAlgorithm(ASTAR)
											}
										>
											A* Search
										</button>
									</li>
								</ul>
							</li>
							<li className="nav-item">
								<button
									disabled={status === RUNNING}
									onClick={handleStart}
								>
									Run
								</button>
							</li>
							<li className="nav-item">
								<button
									disabled={status === RUNNING}
									className={`${weight ? "selected" : null}`}
									onClick={handleWeightClick}
								>
									Add Weight
								</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.navbar {
		background-color: #ddd;
		padding-bottom: 1vh;
		table-layout: fixed;
	}

	.navbar-nav {
	}
	.navbar-brand {
		font-size: 30px;
		color: white;
	}
	button {
		float: left;
		text-align: center;
		padding: 14px 16px;
		font-size: 16px;
		border: 0;
	}

	.navbar button:hover {
		background-color: #3bbc73;
		color: black;
	}

	.hover {
		background-color: #3bbc73;
		color: black;
	}

	.navbar button:disabled {
		background-color: grey;
		color: black;
	}

	.selected {
		animation: glowing 1.5s ease-in-out infinite;
	}

	.alerting {
		animation: alertingGlow 2s ease-out infinite;
	}

	@keyframes glowing {
		0% {
			background-color: ${WEIGHT_COLOR};
			box-shadow: 0 0 5px ${WEIGHT_COLOR};
		}
		50% {
			background-color: #00c8ff;
			box-shadow: 0 0 20px #00c8ff;
		}
		100% {
			background-color: ${WEIGHT_COLOR};
			box-shadow: 0 0 5px ${WEIGHT_COLOR};
		}
	}

	@keyframes alertingGlow {
		0% {
			background-color: #ce0000;
			box-shadow: 0 0 5px #ce0000;
		}
		50% {
			background-color: #ff0000ef;
			box-shadow: 0 0 20px #ff0000ef;
		}
		100% {
			background-color: #ce0000;
			box-shadow: 0 0 5px #ce0000;
		}
	}
`;

export default OptionsBar;
