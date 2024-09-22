import React from 'react';
import {Step} from "../types/game-type";
import NavigationMenuItem from "./navigation-menu-item";

export type NavigationMenuProp =  {
    history: Step[],
    handleJumpTo: (move: number) => void,
}

const NavigationMenu = (props: NavigationMenuProp) => {
    return (
        <div className='game-info'>
            <ol>{
                props.history.map((_step, move) => {
                    return (
                        <NavigationMenuItem key={move} move={move} handleJumpTo={props.handleJumpTo}/>
                    )
                })
            }
            </ol>
        </div>
    );
};

export default NavigationMenu;