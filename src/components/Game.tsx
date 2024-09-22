import Board from "../components/board";
import NavigationMenu from "./navigation-menu";
import {useGameState} from "../hooks/use-game-state";



const Game = () => {
    const {state, currentStatus, currentSquares, handleClick, handleJumpTo} = useGameState();
    return (
        <div className='game'>
            <Board squares={currentSquares} currentStatus={currentStatus} handleClick={handleClick}/>
            <NavigationMenu history={state.history} handleJumpTo={handleJumpTo}></NavigationMenu>
        </div>
    )
};

export default Game;