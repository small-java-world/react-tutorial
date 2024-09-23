import React from 'react';
import Square from "../components/square";
import { SquareState } from "../types/game-type";

type BoardRowProps = {
    rowIndex: number;
    rowLength: number;
    squares: SquareState[];
    handleClick: (i: number) => void;
};

const BoardRow = ({ rowIndex, rowLength, squares, handleClick }: BoardRowProps) => {
    return (
        <div className='board-row'>
            {Array(rowLength).fill(0).map((_, columnIndex) => {
                const squaresIndex = columnIndex + rowIndex * rowLength;
                return (
                    <Square
                        value={squares[squaresIndex]}
                        onSquareClick={() => handleClick(squaresIndex)}
                        key={`column-${rowIndex}-${columnIndex}`}
                    />
                );
            })}
        </div>
    );
};

export default BoardRow;