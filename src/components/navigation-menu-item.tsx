import React from 'react';

export type NavigationMenuItemProps = {
    move: number;
    handleJumpTo: (stepNumber: number) => void;
}

const NavigationMenuItem = (props: NavigationMenuItemProps) => {
    const description = props.move > 0 ? `Go to move #${props.move}` : 'Go to game start'
    return (
        <li key={props.move}>
            <button onClick={() => props.handleJumpTo(props.move)}>{description}</button>
        </li>
    );
};

export default NavigationMenuItem;