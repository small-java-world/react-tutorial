import React from 'react';
import {SquareState} from "../types/gameType";
import Square from "../components/Square"

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
            {Array(rowLength).fill(0).map((_: undefined, rowIndex: number) => {
                return (
                    <div className='board-row' key={`row-${rowIndex}`}>
                        {Array(columnLength).fill(0).map((_: undefined, columnIndex: number) => {
                            const squaresIndex = columnIndex + rowIndex * rowLength;
                            return <Square value={props.squares[squaresIndex]}
                                           onSquareClick={() => props.handleClick(squaresIndex)}
                                           key={`column-${rowIndex}-${columnIndex}`}/>;
                        })}
                    </div>
                );
            })}
        </div>
    );
}


export default Board;