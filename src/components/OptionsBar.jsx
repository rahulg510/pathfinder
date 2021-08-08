/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import { useMatrixContext } from "../contexts/MatrixContext";
import { RUNNING, BUSY } from "../utils/status";
import "../utils/algorithms/algorithms";
import { ASTAR, BFS, DFS, DIJ, GFS } from "../utils/algorithms/algorithms";
import {
	RANDOM_MAZE,
	RANDOM_MAZE_WEIGHTED,
} from "../utils/mazeAlgorithms/mazeAlgorithms";
import { WEIGHT_COLOR } from "../utils/cellConstants";
import { useAlert } from "react-alert";
import Modal from "./Modal";
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

	const handleStart = async () => {
		if (currentAlgorithm) runAlgorithm();
		else {
			alert.error("Pick An Algorithm");
		}
	};

	return (
		<Wrapper>
			<nav
				className={`${
					status === RUNNING || status === BUSY
						? "navbar navbar-expand-lg alerting"
						: "navbar navbar-expand-lg"
				}`}
			>
				<div className="container-fluid">
					<div className="nav-item">
						<a href="/">
							<img src="logo.svg" width="40" alt="site logo" />
							<h3>Pathfinder</h3>
						</a>
					</div>
					<button
						className="navbar-toggler navbar-dark"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarNavDropdown"
						aria-controls="navbarNavDropdown"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div
						className="collapse navbar-collapse"
						id="navbarNavDropdown"
					>
						<ul className="navbar-nav">
							<li className="nav-item">
								<button
									disabled={
										status === RUNNING || status === BUSY
									}
									onClick={resetMatrix}
									style={{ textAlign: "center" }}
								>
									Clear Everything
								</button>
							</li>
							<li className="nav-item">
								<button
									disabled={
										status === RUNNING || status === BUSY
									}
									onClick={clearMatrix}
								>
									Clear Path
								</button>
							</li>
							<li className="nav-item dropdown">
								<button
									disabled={
										status === RUNNING || status === BUSY
									}
									className="dropdown-toggle"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									id="mazeDropdown"
								>
									Mazes
								</button>
								<ul
									className="dropdown-menu"
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
									disabled={
										status === RUNNING || status === BUSY
									}
									className="dropdown-toggle"
									data-bs-toggle="dropdown"
									aria-expanded="false"
									id="algoDropdown"
								>
									{currentAlgorithm || "Algorithms"}
								</button>
								<ul
									className="dropdown-menu"
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
									disabled={
										status === RUNNING || status === BUSY
									}
									className={`${weight ? "selected" : null}`}
									onClick={handleWeightClick}
								>
									Add Weight
								</button>
							</li>
							<li className="nav-item">
								<button
									disabled={
										status === RUNNING || status === BUSY
									}
									onClick={handleStart}
								>
									{status === RUNNING || status === BUSY
										? "Running"
										: "Run"}
								</button>
							</li>
						</ul>
						<li className="nav" id="tutorialButton">
							<Modal />
						</li>
					</div>
				</div>
			</nav>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.navbar {
		background-color: #65b3a1;
		box-shadow: 0 0 15px #65b3a1;
	}

	#tutorialButton {
	}

	#navbarNavDropdown {
		margin-left: 2%;
	}
	.navbar-brand {
		font-size: 30px;
		color: #ffffffa9;
	}
	button {
		padding: 14px 16px;
		font-size: 16px;
		border: 0;
		background-color: inherit;
		color: #ffffffa9;
	}

	h3 {
		display: inline;
		color: #ffffffa9;
		padding-left: 4px;
	}

	a {
		text-decoration: none;
	}

	img {
		padding-bottom: 4px;
	}

	.dropdown-menu {
		background-color: #1d1d1f;
	}

	.dropdown-item {
		text-indent: 2%;
	}

	.navbar button:hover {
		background-color: #303030da;
		color: white;
	}

	.navbar button:disabled {
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
