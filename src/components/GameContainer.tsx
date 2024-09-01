import React from 'react';
import Game from "./Game";
import {useGameState} from "../hooks/useGameState";


const GameContainer = () => {
    const {state, currentState, handleClick, handleJumpTo} = useGameState();
    return (
        <Game state={state} currentState={currentState} handleClick={handleClick} handleJumpTo={handleJumpTo}></Game>
    )
};

export default GameContainer;