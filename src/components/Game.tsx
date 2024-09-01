import Board from "../components/Board";
import NavigationMenu from "./NavigationMenu";
import {GameState, SquareState} from "../types/gameType";
import {getCurrentSquare} from "../utils/GameStateUtil";

export type GameProps = {
    state: GameState,
    currentState: string,
    handleClick : (squaresIndex: number) => void,
    handleJumpTo : (nextMove: number) => void,
}


const Game = (props: GameProps) => {
    const {state, currentState, handleClick, handleJumpTo} = props;
    return (
        <div className='game'>
            <div className="status">{currentState}</div>
            <Board squares={getCurrentSquare(state)} handleClick={handleClick}/>
            <NavigationMenu history={state.history} handleJumpTo={handleJumpTo}></NavigationMenu>
        </div>
    )
};

export default Game;