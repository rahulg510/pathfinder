/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from "styled-components";
import { useMatrixContext } from "../contexts/MatrixContext";
import { RUNNING } from "../utils/status";
import "../utils/algorithms/algorithms";
import { ASTAR, BFS, DFS, DIJ, GFS } from "../utils/algorithms/algorithms";
import { BiTrash  } from "react-icons/bi";


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
		firstUse
	} = useMatrixContext();

	return (
		<Wrapper>
			<nav className="navbar navbar-expand-lg navbar-light">
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
									style={{textAlign: "center"}}
								>
								<BiTrash size="1.5em"/>
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
									id="navbarDarkDropdownMenuLink"
								>
									{firstUse ? "Algorithms" : currentAlgorithm}
								</button>
								<ul
									className="dropdown-menu bg-light"
									aria-labelledby="navbarDarkDropdownMenuLink"
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
									onClick={runAlgorithm}
								>
									Start
								</button>
							</li>
							<li className="nav-item">
								<button>
									{status === RUNNING ? "Running" : "Ready"}
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
		padding-bottom: 2vh;
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
`;

export default OptionsBar;
