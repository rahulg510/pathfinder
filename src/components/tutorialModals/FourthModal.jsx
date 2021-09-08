import React from "react";
import { Button, Icon, Modal } from "semantic-ui-react";

const FourthModal = ({displayModal, handleDisplayModal, handleNextModal}) => {
	return (
			<Modal
				onClose={() => {
					handleDisplayModal(false);
				}}
				open={displayModal}
				dimmer="blurring"

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
									Bidirectional Front-To-Front A* Search
									(Beta):
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
								<br />
								<br />
								<h6>
									Note: Different algorithms may results in
									different shortest path that are the same
									length.
								</h6>
							</div>
						</div>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button
						onClick={() => {
							handleNextModal(true);
							handleDisplayModal(false);
						}}
						primary
					>
						Next <Icon name="chevron right" />
					</Button>
				</Modal.Actions>
			</Modal>
	);
};

export default FourthModal;
