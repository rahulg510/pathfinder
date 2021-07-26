import { useMatrixContext } from "../contexts/MatrixContext";
import { isEquals } from "../utils/helpers";
const Box = ({ row, col, val }) => {
	const {
		changeValue,
		erase,
		mouseDown,
		handleMouseUpDown,
		handleStartMove,
		handleEndMove,
		start,
		end,
		startMove,
		endMove,
		changeStart,
		changeEnd,
		changeStartEnd,
	} = useMatrixContext();

	const handleMouseDown = () => {
		handleMouseUpDown(true);
		if (isEquals({ row, col }, start)) {
			handleStartMove(true);
			changeStartEnd(row, col, 0);
		} else if (isEquals({ row, col }, end)) {
			handleEndMove(true);
			changeStartEnd(row, col, 0);
		} else changeValue(row, col, erase ? 0 : -1);
	};

	const handleMouseUp = () => {
		handleMouseUpDown(false);
		if (startMove) {
			changeStartEnd(row, col, 1);
			changeStart(row, col);
			handleStartMove(false);
		} else if (endMove) {
			changeStartEnd(row, col, 1000);
			changeEnd(row, col);
			handleEndMove(false);
		}
	};

	let oldColor;
	const handleMouseOver = (r, c, e) => {
		if (startMove) {
			oldColor = e.target.style["background-color"];
			e.target.style["background-color"] = "seagreen";
		} else if (endMove) {
			oldColor = e.target.style["background-color"];
			e.target.style["background-color"] = "#FF4136";
		} else {
			let val = erase ? 0 : -1;
			if (mouseDown) changeValue(r, c, val);
		}
	};

	const handleMouseLeave = (e) => {
		e.target.style["background-color"] = oldColor;
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
			case 4: 
				color = "#FFDC00"
				break;
			case 1000:
				color = "#FF4136";
				break;
			case 2000:
				color = "#01FF70";
				break;
			default:
				color = "#DDDDDD";
		}
		return color;
	};
	return (
		<div
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			className="box cell"
			style={{
				backgroundColor: getColor(val),
				transition: "all .5s linear",
			}}
			onMouseOver={(e) => handleMouseOver(row, col, e)}
			onMouseLeave={(e) => handleMouseLeave(e)}
		></div>
	);
};

export default Box;
