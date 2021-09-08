import React from "react";
import { Button, Icon, Modal, Image } from "semantic-ui-react";
import * as constants from "../../utils/cellConstants";

const SecondModal = ({displayModal, handleDisplayModal, handleNextModal}) => {
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

export default SecondModal;
