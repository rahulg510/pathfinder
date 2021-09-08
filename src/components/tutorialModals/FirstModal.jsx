import React, { useState } from "react";
import { Button, Icon, Modal, Image } from "semantic-ui-react";
import * as constants from "../../utils/cellConstants";

const FirstModal = ({ displayModal, handleDisplayModal, handleNextModal }) => {
	const [hover, setHover] = useState(false);
	return (
		<Modal
			open={displayModal}
			dimmer="blurring"
			style={{
				height: "auto",
				top: "auto",
				left: "auto",
				bottom: "auto",
				right: "auto",
			}}
			onClose={() => handleDisplayModal(false)}
			onOpen={() => handleDisplayModal(true)}
			trigger={
				<button
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					onClick={()=>handleDisplayModal(true)}
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
						handleNextModal(true);
						handleDisplayModal(false);
					}}
					primary
				>
					Begin Tutorial <Icon name="chevron right" />
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default FirstModal;
