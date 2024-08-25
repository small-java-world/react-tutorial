import React from 'react';
import Game from "./Game";
import {useGameState} from "../hooks/useGameState";


const GameContainer = () => {
    const {state, currentSquares, currentState, xIsNext, handleClick, jumpTo} = useGameState();
    return (
        <Game state={state} currentSquares={currentSquares} currentState={currentState} xIsNext={xIsNext} handleClick={handleClick} jumpTo={jumpTo}></Game>
    )
};

export default GameContainer;