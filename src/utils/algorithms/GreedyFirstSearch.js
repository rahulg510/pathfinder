import heap from "heap";
import { isEquals, checkIndexes } from "../helpers";

export const gfs = async (matrix, start, end, changeValue) => {
    const pQueue = new heap((a,b)=>{
        return a.val - b.val;
    });

    const push = (row,col,val) => {
        pQueue.insert({row,col,val});
    }

    const getHeuristic = (row, col) => {
        return Math.abs(end.row - row) + Math.abs(end.col - col);
    }

    const visitNeighbors = ({row,col,val}) =>{
        if (checkIndexes(matrix, row - 1, col)) {
			let cell = matrix[row - 1][col];
			if (cell.value === 0) {
                cell.value = 2;
                let cost = getHeuristic(row-1,col);
				push(row - 1, col, cost );
			}
		}
		if (checkIndexes(matrix, row + 1, col)) {
			let cell = matrix[row + 1][col];
			if (cell.value === 0) {
                cell.value = 2;
                let cost = getHeuristic(row+1, col);
				push(row + 1, col, cost);
			}
		}
		if (checkIndexes(matrix, row, col + 1)) {
			let cell = matrix[row][col + 1];
			if (cell.value === 0) {
                cell.value = 2;
                let cost = getHeuristic(row, col+1);
				push(row, col + 1, cost);
			}
		}
		if (checkIndexes(matrix, row, col - 1)) {
			let cell = matrix[row][col - 1];
			if (cell.value === 0) {
                cell.value = 2;
                let cost = getHeuristic(row, col-1);
				push(row, col - 1, cost);
			}
		}
    }

    let begin = {
        row: start.row,
        col: start.col,
        val: 0
    }

    pQueue.insert(begin);

    while(pQueue.size() > 0){
        let cell = pQueue.pop();
        if(isEquals(cell, end)){
            console.log("ended");
            return Promise.resolve([]);
        }
        if(!isEquals(cell,start)) changeValue(cell.row, cell.col, 3);
        visitNeighbors(cell);

        await new Promise(r=>setTimeout(r,0));
    }
    return Promise.resolve([]);
}

export const GFS = "GFS";