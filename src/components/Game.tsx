import Board from "../components/Board";
import NavigationMenu from "./NavigationMenu";
import {GameState, SquareState} from "../types/gameType";
import {getCurrentSquare} from "../utils/GameStateUtil";

type GameProps = {
    state: GameState,
    currentState: string,
    handleClick : (squaresIndex:number) => void,
    jumpTo : (nextMove:number) => void,
}


const Game = (props: GameProps) => {
    const {state, currentState, handleClick, jumpTo} = props;
    return (
        <div className='game'>
            <div className="status">{currentState}</div>
            <Board squares={getCurrentSquare(state)} onSquareClick={handleClick}/>
            <NavigationMenu history={state.history} onJumpTo={jumpTo}></NavigationMenu>
        </div>
    )
};

export default Game;