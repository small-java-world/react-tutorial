import React from 'react';
import {Step} from "../types/game-type";

export type NavigationMenuProp =  {
    history: Step[],
    handleJumpTo: (move: number) => void,
}

const NavigationMenu = (props: NavigationMenuProp) => {
    return (
        <div className='game-info'>
            <ol>{
                props.history.map((_step, move) => {
                    const description = move > 0 ? `Go to move #${move}` : 'Go to game start'
                    return (
                        <li key={move}>
                            <button onClick={() => props.handleJumpTo(move)}>{description}</button>
                        </li>
                    )
                })
            }
            </ol>
        </div>
    );
};

export default NavigationMenu;