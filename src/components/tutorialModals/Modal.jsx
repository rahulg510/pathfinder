import React, { useState } from "react";
import { useMatrixContext } from "../../contexts/MatrixContext";
import { Button, Icon, Modal, Image } from "semantic-ui-react";
import * as constants from "../../utils/cellConstants";

const ModalScrollingContent = () => {
	const { tutorialOpen, handleTutorialModal } = useMatrixContext();
	const [secondModal, handleSecondModal] = useState(false);
	const [thirdModal, handleThirdModal] = useState(false);
	const [fourthModal, handleFourthModal] = useState(false);
	const [fifthModal, handleFifthModal] = useState(false);
	const [hover, setHover] = useState(false);
	return (
		<Modal
			open={tutorialOpen}
			dimmer="blurring"
			style={{
				height: "auto",
				top: "auto",
				left: "auto",
				bottom: "auto",
				right: "auto",
			}}
			onClose={() => handleTutorialModal(false)}
			onOpen={() => handleTutorialModal(true)}
			trigger={
				<button
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					style={{
						backgroundColor: hover ? "#303030b6" : "#3030304b",
						color: "white",
						boxShadow:
							"0 0 3px " + (hover ? "#303030b6" : "#3030304b"),
					}}
				>
					Tutorial
				</button>
			}
		>
			<Modal.Header>About</Modal.Header>
			<Modal.Content>
				<Modal.Description>
					<div>
						<Image
							src={constants.LOGO_IMG}
							size="small"
							centered={true}
						/>
						<h2 style={{ textAlign: "center" }}>Pathfinder</h2>
						<h6 style={{ textAlign: "center" }}>
							The application finds a path from the start point to
							the endpoint, if it exists. Users can draw obstacles
							on the grid such as walls or weighted cells, which
							the program will take into account in its search for
							a path.
						</h6>
					</div>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button
					onClick={() => {
						handleSecondModal(true);
					}}
					primary
				>
					Begin Tutorial <Icon name="chevron right" />
				</Button>
			</Modal.Actions>

			<Modal
				onClose={() => {
					handleSecondModal(false);
					handleTutorialModal(false);
				}}
				open={secondModal}
				style={{
					height: "70%",
					top: "auto",
					left: "auto",
					bottom: "auto",
					right: "auto",
				}}
			>
				<Modal.Header>Start & End</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<div>
							<div style={{ textAlign: "center" }}>
								<div
									style={{
										backgroundColor: constants.START_COLOR,
										display: "inline-block",
										padding: "4px",
										margin: "4px",
									}}
								>
									<Image
										src={constants.START_IMG}
										size="mini"
									/>
									<p style={{ textAlign: "center" }}>Start</p>
								</div>

								<div
									style={{
										backgroundColor: constants.END_COLOR,
										display: "inline-block",
										padding: "4px",
										margin: "4px",
									}}
								>
									<Image
										src={constants.END_IMG}
										size="mini"
									/>
									<p style={{ textAlign: "center" }}>End</p>
								</div>
							</div>
							<div style={{ textAlign: "center" }}>
								<hr />
								<img
									src="startEnd.gif"
									alt="gif of demoing how to move start and end"
								/>
								<h5>
									Drag and drop the start or endpoint to
									change its location.
								</h5>
							</div>
						</div>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						onClick={() => {
							handleSecondModal(false);
							handleThirdModal(true);
						}}
						primary
					>
						Next <Icon name="chevron right" />
					</Button>
				</Modal.Actions>
			</Modal>

			<Modal
				onClose={() => {
					handleThirdModal(false);
					handleTutorialModal(false);
				}}
				open={thirdModal}
				style={{
					height: "70%",
					top: "auto",
					left: "auto",
					bottom: "auto",
					right: "auto",
				}}
			>
				<Modal.Header>Walls and Weights</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<div>
							<div style={{ textAlign: "center" }}>
								<div
									style={{
										backgroundColor: constants.WALL_COLOR,
										display: "inline-block",
										padding: "4px",
										margin: "4px",
									}}
								>
									<Image
										src={constants.WALL_IMG}
										size="mini"
										centered={true}
									/>
									<p style={{ textAlign: "center" }}>Wall</p>
								</div>

								<div
									style={{
										backgroundColor: constants.WEIGHT_COLOR,
										display: "inline-block",
										padding: "4px",
										margin: "4px",
									}}
								>
									<Image
										src={constants.WEIGHT_IMG}
										size="mini"
										centered={true}
									/>
									<p style={{ textAlign: "center" }}>
										Weight
									</p>
								</div>
							</div>
							<div style={{ textAlign: "center" }}>
								<hr />
								<img
									src="wallWeight.gif"
									alt="giffy"
									width="60%"
								/>
								<h5>
									Click and drag on a cell to make them wall
									cells. Click the 'Add Weight' button to
									create a weighted cell.
									<br />
									<br />
									<b>Wall cells</b> are impenetrable.
									<br />
									<b>Weighted cells</b> have a cost of 15.
									<br />
									All other cells have a cost of 1.
								</h5>
								<h6>
									Note: Breadth-First Search and Depth-First
									Search are unweighted, so weighted cells
									will be removed.
								</h6>
							</div>
						</div>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						onClick={() => {
							handleThirdModal(false);
							handleFourthModal(true);
						}}
						primary
					>
						Next <Icon name="chevron right" />
					</Button>
				</Modal.Actions>
			</Modal>

			<Modal
				onClose={() => {
					handleFourthModal(false);
					handleTutorialModal(false);
				}}
				open={fourthModal}
				style={{
					height: "70%",
					top: "auto",
					left: "auto",
					bottom: "auto",
					right: "auto",
				}}
			>
				<Modal.Header>Algorithms</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<div>
							<div style={{ textAlign: "center" }}>
								<h5>
									Choose an algorithm from the drop-down menu.
								</h5>
								<h2>Algorithms</h2>
								<h4>Unweighted</h4>
								<h5 style={{ display: "inline" }}>
									Breadth-First Search (BFS):
								</h5>
								<p style={{ display: "inline" }}>
									{" "}
									A fundamental pathfinding algorithm. BFS
									explores equally in all directions until the
									goal is reached. It starts from a chosen
									node and examines all its neighbors, then it
									examines all the neighbors of the neighbors,
									and so on. It guarantees the shortest path
									when the graph is unweighted.
								</p>
								<br />
								<br />
								<h5 style={{ display: "inline" }}>
									Depth-First Search (DFS):
								</h5>
								<p style={{ display: "inline" }}>
									{" "}
									DFS algorithm is a recursive algorithm that
									uses the idea of backtracking. It involves
									exhaustive searches of all the nodes by
									going ahead, if possible, else by
									backtracking. This is not an efficient
									algorithm for pathfinding and does not
									guarantees the shortest path.
								</p>

								<h4>Weighted</h4>
								<h5 style={{ display: "inline" }}>
									Dijkstra's Algorithm:
								</h5>
								<p style={{ display: "inline" }}>
									{" "}
									A fundamental algorithm for finding the
									shortest path on a weighted or unweighted
									graph. The algorithm uses a greedy approach
									and makes use of a priority queue to keep
									track of nodes to visit next. This algorithm
									guarantees the shortest path.
								</p>
								<br />
								<br />

								<h5 style={{ display: "inline" }}>
									Greedy Best-First Search:
								</h5>
								<p style={{ display: "inline" }}>
									{" "}
									Uses a heuristic function to decide which
									node to explore. A heuristic function is
									implemented depending on application
									requirements, the Manhattan distance
									heuristic is used in this implementation.
									The heuristic function attempts to estimates
									the distance from the current node to the
									destination node. The algorithm calculates
									the heuristic value of all the neighbors of
									a node and adds them to a priority queue.
									The node with the least costing heuristic is
									visited. This algorithm does not guarantee
									the shortest path.
								</p>
								<br />
								<br />
								<h5 style={{ display: "inline" }}>
									A* (A Star) Search:
								</h5>
								<p style={{ display: "inline" }}>
									{" "}
									A very efficient algorithm to find the
									shortest path. It uses a heuristic function
									like the Greedy Best-First Search but also
									takes into account the total cost thus far
									to reach the current node. The cost so far
									is added with the heuristic cost. The sum is
									added to the priority queue. The least
									costing node is removed from the priority
									queue to be visited. This algorithm
									guarantees the shortest path.
								</p>
								<br />
								<br />
								<h5 style={{ display: "inline" }}>
									Bidirectional Front-To-Front Greedy
									Best-First Search:
								</h5>
								<p style={{ display: "inline" }}>
									{" "}
									This algorithm runs the Greedy Best-First
									Search from both the start node and end
									node. The target of the current node is the
									top node in the opposite side's priority
									queue instead of the start or end node hence
									the prefix front-to-front. The algorithm
									does not guarantee the shortest path.
								</p>
								<br />
								<br />
								<h5 style={{ display: "inline" }}>
									Bidirectional Dijkstra's Algorithm:
								</h5>
								<p style={{ display: "inline" }}>
									{" "}
									This algorithm runs Dijkstra's Algorithm
									from both start and end nodes. The algorithm
									continues until there is a node that has
									been visited by both sides. Once this
									occurs, the remaining nodes in both side's
									priority queues are visited to confirm that
									the shortest path has been achieved. This
									algorithm guarantees the shortest path.
								</p>
								<br />
								<br />
								<h5 style={{ display: "inline" }}>
									Bidirectional Front-To-Front A* Search:
								</h5>
								<p style={{ display: "inline" }}>
									{" "}
									This algorithm runs the A* Search from both
									the start node and end node. The target of
									the current node is the top node in the
									opposite side's priority queue instead of
									the start or end node hence the prefix
									front-to-front. The algorithm guarantees the
									shortest path.
								</p>
							</div>
						</div>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						onClick={() => {
							handleFourthModal(false);
							handleFifthModal(true);
						}}
						primary
					>
						Next <Icon name="chevron right" />
					</Button>
				</Modal.Actions>
			</Modal>

			<Modal
				onClose={() => {
					handleFifthModal(false);
					handleTutorialModal(false);
				}}
				open={fifthModal}
				style={{
					height: "auto",
					top: "auto",
					left: "auto",
					bottom: "auto",
					right: "auto",
				}}
			>
				<Modal.Header>Run and Tutorial</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<div style={{ textAlign: "center" }}>
							<img
								src="tutorial.png"
								alt="tutorial and run button"
								width="60%"
							/>
							<h5>
								Press run to start the visualization.
								<br />
								This tutorial is accessible at all times by
								clicking on the tutorial button in top right
								corner.
							</h5>
						</div>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						onClick={() => {
							handleFifthModal(false);
							handleTutorialModal(false);
						}}
						color="green"
						icon="check"
						content="All Done"
					/>
				</Modal.Actions>
			</Modal>
		</Modal>
	);
};

export default ModalScrollingContent;
