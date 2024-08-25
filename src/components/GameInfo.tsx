import React from 'react';

type MoveTarget = {
    stepNumber: number;
    jumpTo: (stepNumber: number) => void;
}


const GameInfo = (props: MoveTarget) => {
    const desc = props.stepNumber > 0 ? `Go to move #${props.stepNumber}` : 'Go to game start'
    return (
        <li key={props.stepNumber}>
        <button onClick={() => props.jumpTo(props.stepNumber)}>{desc}</button>
        </li>
    );
};

export default GameInfo;