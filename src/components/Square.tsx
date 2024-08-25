import React from 'react';
import {SquareState} from "../types/gameType";

export type SquareProps = {
    value: SquareState
    onSquareClick: () => void
}

const Square = (props: SquareProps) => (
    <button className='square' onClick={props.onSquareClick}>
        {props.value}
    </button>
)

export default Square;