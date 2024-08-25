import React from 'react';
import Game from "./Game";
import {useGameState} from "../hooks/useGameState";


const GameContainer = () => {
    const {state, currentState, handleClick, jumpTo} = useGameState();
    return (
        <Game state={state} currentState={currentState} handleClick={handleClick} jumpTo={jumpTo}></Game>
    )
};

export default GameContainer;