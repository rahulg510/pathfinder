import React, { useState } from "react";

const Box = ({ row, col, changeValue, val, clicked, setClicked }) => {
    const [visited, setVisited] = useState(false);
    
    const clickHandler = () => {
        setClicked((clicked) => {
            if(clicked){
                return !clicked;
            }
            changeValue(row,col,-1);
            return !clicked;
        })
    }

	const getColor = (value) => {
		let color = "";
		switch (val) {
			case -100:
				color = "green";
				break;
			case -1:
				color = "orange";
				break;
			case 1:
				color = "yellow";
				break;
			case 100:
				color = "red";
				break;
			default:
				color = "lightgrey";
		}
		return color;
	};
	return (
		<div
			className="box"
			style={{ backgroundColor: getColor(val) }}
			onMouseOver={clicked ? () => changeValue(row, col, -1) : null}
			onClick={clickHandler}
		></div>
	);
};

export default Box;
