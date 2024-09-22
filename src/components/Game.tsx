import Board from "../components/Board";
import NavigationMenu from "./NavigationMenu";
import {useGameState} from "../hooks/useGameState";



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