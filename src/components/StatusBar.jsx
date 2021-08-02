import React from "react";
import styled from "styled-components";
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
		<Wrapper className="container-fluid">
			<button disabled={status === RUNNING} onClick={runAlgorithm}>
				Start
			</button>
			<h6>{status === RUNNING ? "Running" : "Ready"}</h6>
			<h6>{currentAlgorithm}</h6>
			<button
				disabled={status === RUNNING}
				className={`${weight ? "selected" : null}`}
				onClick={handleWeightClick}
			>
				Add Weight
			</button>
		</Wrapper>
	);
};

const Wrapper = styled.div`
button{
	padding: 14px 16px;
}

`;

export default StatusBar;
