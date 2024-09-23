import React from 'react';
import {SquareState} from "../types/game-type";
import BoardRow from "./board-row";

const rowLength = 3;
const columnLength = 3;

export type BoardProps = {
    squares: SquareState[],
    currentStatus: string,
    handleClick: (i: number) => void
}

const Board = (props: BoardProps) => {
    return (
        <div className="game-board">
            <div className="status">{props.currentStatus}</div>
            {Array(rowLength).fill(0).map((_: undefined, rowIndex: number) => (
                <BoardRow
                    rowIndex={rowIndex}
                    rowLength={columnLength}
                    squares={props.squares}
                    handleClick={props.handleClick}
                    key={`row-${rowIndex}`}
                />
            ))}
        </div>
    );
}

export default Board;