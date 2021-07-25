const Box = ({
	row,
	col,
	changeValue,
	val,
	cellClicked,
	handleCellClick,
	erase,
}) => {
	const handleMouseOver = (r, c) => {
		let val = erase ? 0 : -1;
		if (cellClicked) changeValue(r, c, val);
	};


	const getColor = (val) => {
		let color = "";
		switch (val) {
			case -1:
				color = "deepskyblue";
				break;
			case 0:
				color = "#DDDDDD";
				break;
			case 1:
				color = "seagreen";
				break;
			case 2:
				color = "#FFDC00";
				break;
			case 3:
				color = "lightsalmon";
				break;
			case 1000:
				color = "#FF4136";
				break;
			case 2000:
				color = "#01FF70";
				break;
			default:
				color = "#FF851B";
		}
		return color;
	};
	return (
		<div
			onMouseDown={()=>console.log("dragged")}
			onMouseUp={()=>console.log("picked up")}
			className="box cell"
			style={{
				backgroundColor: getColor(val),
				transition: "all .7s linear",
			}}
			onMouseOver={() => handleMouseOver(row, col)}
			onClick={() => {
				handleCellClick(row, col);
			}}
		></div>
	);
};

export default Box;
