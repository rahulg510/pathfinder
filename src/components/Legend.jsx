import React from "react";
import styled from "styled-components";
import * as constants from "../utils/cellConstants";
import { algoInfo } from "../utils/algorithms/algorithms";
import { useMatrixContext } from "../contexts/MatrixContext";
export const Legend = () => {
	const { currentAlgorithm } = useMatrixContext();
	return (
		<Wrapper>
			<div className="legend-container">
				<div className="legend-item">
					<div
						className="legend-img"
						style={{
							backgroundImage: `url(${constants.START_IMG})`,
							backgroundColor: constants.START_COLOR,
						}}
					/>
					<p>Starting Point</p>
				</div>
				<div className="legend-item">
					<div
						className="legend-img"
						style={{
							backgroundImage: `url(${constants.END_IMG})`,
							backgroundColor: constants.END_COLOR,
						}}
					/>
					<p>Destination</p>
				</div>
				<div className="legend-item">
					<div
						className="legend-img"
						style={{
							backgroundImage: `url(${constants.WALL_IMG})`,
							backgroundColor: constants.WALL_COLOR,
						}}
					/>
					<p>Wall Cell</p>
				</div>
				<div className="legend-item">
					<div
						className="legend-img"
						style={{
							backgroundImage: `url(${constants.WEIGHT_IMG})`,
							backgroundColor: constants.WEIGHT_COLOR,
						}}
					/>
					<p>Weighted Cell</p>
				</div>
				<div className="legend-item">
					<div
						className="legend-img"
						style={{
							backgroundColor: constants.FOURTH_ANIMATION_COLOR,
						}}
					/>
					<p>Visited Cell</p>
				</div>
				<div className="legend-item">
					<div
						className="legend-img"
						style={{
							backgroundColor: constants.DEFAULT_COLOR,
							border: "#DDD 1px solid",
						}}
					/>
					<p>Unvisited Cell</p>
				</div>
				<div className="legend-item">
					<div
						className="legend-img"
						style={{
							backgroundColor: constants.PATH_COLOR,
						}}
					/>
					<p>Path Cell</p>
				</div>
			</div>
			<div className="mainDiv">
				<div className={`${currentAlgorithm ? "algoInfo" : "hide"}`}>
					<div className="algoStatus">
						<h5>Shortest Path Guaranteed</h5>
						<div
							className={`${
								algoInfo[currentAlgorithm] &&
								algoInfo[currentAlgorithm].shortestGuaranteed
									? "yes"
									: "negativeImg"
							}`}
						></div>
					</div>
					<div className="algoStatus">
						<h5>Weighted</h5>
						<div
							className={`${
								algoInfo[currentAlgorithm] &&
								algoInfo[currentAlgorithm].weighted
									? "yes"
									: "negativeImg"
							}`}
						></div>
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.legend-img {
		width: 4vh;
		height: 4vh;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
		display: inline-block;
	}

	.legend-container {
		margin-top: 1vh;
		display: flex;
		flex-direction: row;
		justify-content: center;
		text-align: center;
	}

	.legend-item {
		width: fit-content;
		padding: 1vh;
		justify-content: space-between;
	}
	p {
		margin: 0;
	}

	.mainDiv{
		height: 3vh;
		display: block;
	}

	.algoInfo {
		display: inline-block;
		text-align: center;
	}

	.algoStatus h5,
	div {
		display: inline;
		padding: 0 4px;
		text-align: center;
	}

	.hide {
		display: none;
	}

	.yes {
		background-image: url(${constants.TRUE_IMG});
		width: 2vh;
		height: 2vh;
		display: inline-block;
		vertical-align: text-bottom;
	}
	.negativeImg {
		background-image: url(${constants.FALSE_IMG}); 
	    width: 2vh;
		height: 2vh; 
		display: inline-block;
		vertical-align: text-bottom;
	}
`;
