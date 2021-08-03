import { WALL } from "../cellTypes";

const createRandomMaze = async (matrix, start, end, changeType) => {

    for(let i = 0; i < matrix.length; i++){
        for(let j = 0; j < matrix[0].length; j++){
            let num = Math.random() * 100;
		    let bool = (i === start.row && j === start.col) || (i === end.row && j === end.col);
            if(num < 20 && !bool){
                changeType(i, j, WALL);
                // await new Promise(r=>setTimeout(r,0));
            }
        }
    }
}


export default createRandomMaze;