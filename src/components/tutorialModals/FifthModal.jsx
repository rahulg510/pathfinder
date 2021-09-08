import React from "react";
import { Button, Modal } from "semantic-ui-react";
import { useMatrixContext } from "../../contexts/MatrixContext";

const FifthModal = ({ displayModal, handleDisplayModal }) => {
	const { handleTutorialDone } = useMatrixContext();
	return (
		<Modal
			onClose={() => {
				handleDisplayModal(false);
				handleTutorialDone(true);
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
							This tutorial is accessible at all times by clicking
							on the tutorial button in top right corner.
						</h5>
					</div>
				</Modal.Description>
			</Modal.Content>
			<Modal.Actions>
				<Button
					onClick={() => {
						handleDisplayModal(false);
						handleTutorialDone(true);
					}}
					color="green"
					icon="check"
					content="All Done"
				/>
			</Modal.Actions>
		</Modal>
	);
};

export default FifthModal;
