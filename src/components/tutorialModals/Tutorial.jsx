import React, { useEffect, useState } from "react";
import FirstModal from "./FirstModal";
import SecondModal from "./SecondModal";
import ThirdModal from "./ThirdModal";
import FourthModal from "./FourthModal";
import FifthModal from "./FifthModal";
import { useMatrixContext } from "../../contexts/MatrixContext";

const Tutorial = () => {
	const { tutorialDone } = useMatrixContext();
	const [firstModal, handleFirstModal] = useState(false);
	const [secondModal, handleSecondModal] = useState(false);
	const [thirdModal, handleThirdModal] = useState(false);
	const [fourthModal, handleFourthModal] = useState(false);
	const [fifthModal, handleFifthModal] = useState(false);

	useEffect(() => {
		handleFirstModal(!tutorialDone);
	}, [tutorialDone]);
	return (
		<>
			<FirstModal
				displayModal={firstModal}
				handleDisplayModal={handleFirstModal}
				handleNextModal={handleSecondModal}
			/>
			<SecondModal
				displayModal={secondModal}
				handleDisplayModal={handleSecondModal}
				handleNextModal={handleThirdModal}
			/>
			<ThirdModal
				displayModal={thirdModal}
				handleDisplayModal={handleThirdModal}
				handleNextModal={handleFourthModal}
			/>
			<FourthModal
				displayModal={fourthModal}
				handleDisplayModal={handleFourthModal}
				handleNextModal={handleFifthModal}
			/>
			<FifthModal
				displayModal={fifthModal}
				handleDisplayModal={handleFifthModal}
			/>
		</>
	);
};

export default Tutorial;
