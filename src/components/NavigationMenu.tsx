import React from 'react';
import {Step} from "../types/gameType";

type NavigationMenuProp =  {
    history: Step[],
    onJumpTo: (move: number) => void,
}

const NavigationMenu = (props: NavigationMenuProp) => {
    return (
        <div className='game-info'>
            <ol>{
                props.history.map((_step, move) => {
                    const desc = move > 0 ? `Go to move #${move}` : 'Go to game start'
                    return (
                        <li key={move}>
                            <button onClick={() => props.onJumpTo(move)}>{desc}</button>
                        </li>
                    )
                })
            }
            </ol>
        </div>
    );
};

export default NavigationMenu;