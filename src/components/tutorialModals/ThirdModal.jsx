import React from "react";
import { Button, Icon, Modal, Image } from "semantic-ui-react";
import * as constants from "../../utils/cellConstants";

const ThirdModal = ({displayModal, handleDisplayModal, handleNextModal}) => {
	return (
			<Modal
				onClose={() => {
					handleDisplayModal(false);
				}}
				open={displayModal}
				dimmer="blurring"

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
									Click and drag on cells to make them wall
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

export default ThirdModal;
