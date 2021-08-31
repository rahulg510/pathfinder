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
							Application finds a path from the start point to the
							end point, if it exists. User can draw obsticles on
							the grid such as walls or weighted cells, which the
							program will take into account in its search for a
							path.
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
					height: "auto",
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
									Drag and drop the start or end point to
									change its location
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
					height: "auto",
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
									created a weighted cell.
									<br />
									Wall cells are impenetrable.
									<br />
									Weighted cells have a cost of 15.
									<br />
									All other cells have a cost of 1.
								</h5>
								<h6>
									Note: Breadth-First Search and Depth-First
									Search are unweighted, so weighted cells
									will be removed
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
					height: "auto",
					top: "auto",
					left: "auto",
					bottom: "auto",
					right: "auto",
				}}
			>
				<Modal.Header>Algorithms and Mazes</Modal.Header>
				<Modal.Content>
					<Modal.Description>
						<div>
							<div style={{ textAlign: "center" }}>
								<h5>
									Choose an algorithm from drop down. You can
									also choose a maze to auto populate walls
									and weight on the grid.
								</h5>
								<h2>Algorithms</h2>
								<h4>Unweighted</h4>
								<p>
									Breadth-First Search: A fundamental path
									finding algorithm. It guarantees shortest
									path when the cost of all edge and vertices
									is the same. Breadth First Search explores
									equally in all directions until the goal is
									reached. It starts from a chosen node and
									examine all its neighbors, then it examines
									all the neighbors of the neighbors, and so
									on...
								</p>
								<p>Depth-First Search: </p>
								<h4>Weighted</h4>
								<p>Dijkstra's Algorithm: </p>
								<p> A* (A Star) Search: </p>
								<p>Greedy Best First Search:</p>
								<p>Bidirectional Greedy Best First Search:</p>
								<p>Bidirectional Dijkstra's Algorithm:</p>
								<p>Bidirectional A* Search:</p>
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
