import Board from "../components/Board";
import NavigationMenu from "./NavigationMenu";
import {GameState, SquareState} from "../types/gameType";

type GameProps = {
    state: GameState,
    currentSquares: SquareState[],
    currentState: string,
    xIsNext: boolean,
    handleClick : (squaresIndex:number) => void,
    jumpTo : (nextMove:number) => void,
}


const Game = (props: GameProps) => {
    const {state, currentSquares, currentState, xIsNext, handleClick, jumpTo} = props;
    return (
        <div className='game'>
            <div className="status">{currentState}</div>
            <Board xIsNext={xIsNext} squares={currentSquares} onSquareClick={handleClick}/>
            <NavigationMenu history={state.history} onJumpTo={jumpTo}></NavigationMenu>
        </div>
    )
};

export default Game;