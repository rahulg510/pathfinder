import Box from "./Box";
import styled from "styled-components";
import { useEffect, useState } from "react";

const Matrix = () => {
  let initialMatrix = [];
  let savedMatrix = JSON.parse(localStorage.getItem("matrix"));
  if (savedMatrix instanceof Array) {
    initialMatrix = savedMatrix;
  } else {
    const rows = 30;
    const cols = 30;
    for (let i = 0; i < rows; i++) {
      initialMatrix.push(new Array(cols).fill(0));
    }
    initialMatrix[0][0] = -100;
    initialMatrix[rows - 1][cols - 1] = 100;
  }
  const [matrix, setMatrix] = useState(initialMatrix);
  
  const resetMatrix = () =>{
      
  }

  const changeValue = (r, c, val) => {
    console.log(r, c, val);
    matrix[r][c] = val;
    setMatrix([...matrix]);
  };

  useEffect(()=>{
      localStorage.setItem("matrix", JSON.stringify(matrix));
  })
  return (
    <Wrapper>

      <div className="flex">
        {matrix.map((arr, row) => {
          return (
            <div key={row}>
              {arr.map((i, col) => {
                return (
                  <Box
                    key={`${row}${col}`}
                    row={row}
                    col={col}
                    changeValue={changeValue}
                    val={i}
                  ></Box>
                );
              })}
            </div>
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .box {
    height: 2vh;
    width: 2vh;
    background-color: lightgray;
    border: solid 1px black;
  }
  .flex {
    width: 80vw;
    height: 80vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }

  .visited {
    background-color: blueviolet;
  }
`;

export default Matrix;
