import React from "react";
import { useMatrixContext } from "../contexts/MatrixContext";
import { RUNNING } from "../utils/status";
const StatusBar = () => {
	const {
		status,
		runAlgorithm,
		weight,
		handleWeightClick,
		currentAlgorithm
	} = useMatrixContext();
	return (
		<div>
			<button disabled={status === RUNNING} onClick={runAlgorithm}>
				Start
			</button>
			<h2>{status === RUNNING ? "Running" : "Ready"}</h2>
			<h2>{currentAlgorithm}</h2>
			<button
				disabled={status === RUNNING}
				className={`${weight ? "selected" : null}`}
				onClick={handleWeightClick}
			>
				Add Weight
			</button>
		</div>
	);
};

export default StatusBar;
