import React, { useState } from "react";

const Box = ({row,col,changeValue, val}) => {
  const [visited, setVisited] = useState(false);

  const getColor = (value) => {
    let color = "";
    switch(val){
        case -100: color = "green"; break;
        case -1: color = "darkblue"; break;
        case 100 : color = "red"; break;
        default: color = "lightgrey"
    }
    return color;
  }
  return (
    <div
      className={`${val === -1 ? "box visited" : "box"}`}
      style={{backgroundColor: getColor(val)}}
      onMouseEnter={() => setVisited((state) => !state)}
      onClick={()=>changeValue(row,col,-1)}
    ></div>
  );
};

export default Box;
