import {useReducer} from "react";

const OptionsBar = ({resetMatrix})=>{
    return <>
        <button onClick={resetMatrix}>Reset</button>
    </>
}

export default OptionsBar;
