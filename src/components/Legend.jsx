import React from "react";
import styled from "styled-components";
import * as constants from "../utils/cellConstants";
export const Legend = () => {
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
		border: "#DDD 1px solid"

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
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.legend-img {
		width:4vh;
		height:4vh;
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

	.legend-item{
		width: fit-content;
		padding: 1vh;
		justify-content: space-between;
	}
	p{
		margin: 0;
	}
`;
