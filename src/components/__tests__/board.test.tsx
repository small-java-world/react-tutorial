import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react';
import Board from '../board';
import * as boardRow from "../board-row";
import {SquareState} from "../../types/game-type";

jest.mock('../board-row');

describe('Board Component', () => {
    const onSquareClick = jest.fn();
    const squares: SquareState[] = ["O", "O", "X", "O", "X", "O", "X", "O", "X"];
    let boardRowSpy: jest.SpyInstance;
    const mockCurrentStatus = "Next player: X";

    beforeEach(() => {
        boardRowSpy = jest.spyOn(boardRow, "default");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the correct number of rows', () => {
        render(<Board squares={squares} currentStatus={mockCurrentStatus} handleClick={onSquareClick}/>);
        expect(screen.getByText(/Next player: X/i)).toBeInTheDocument();

        expect(boardRowSpy).toHaveBeenCalledTimes(3);
        Array(3).fill(0).forEach((_, rowIndex) => {
            expect(boardRowSpy).toHaveBeenNthCalledWith(rowIndex + 1,
                {
                    rowIndex,
                    rowLength: 3,
                    squares,
                    handleClick: expect.any(Function),
                },
                {}
            );
        });
    });

    it('calls handleClick when a square is clicked', () => {
        boardRowSpy.mockImplementation(({ rowIndex, handleClick }) => {
            return (
                <div className='board-row' data-testid={`board-row-${rowIndex}`} onClick={() => handleClick(rowIndex)} />
            );
        });
        render(<Board squares={squares} currentStatus={mockCurrentStatus} handleClick={onSquareClick}/>);
        const firstRow = screen.getByTestId('board-row-0');
        fireEvent.click(firstRow);
        expect(onSquareClick).toHaveBeenCalledTimes(1);
        expect(onSquareClick).toHaveBeenNthCalledWith(1, 0);

        const secondRow =  screen.getByTestId('board-row-1');
        fireEvent.click(secondRow);
        expect(onSquareClick).toHaveBeenCalledTimes(2);
        expect(onSquareClick).toHaveBeenNthCalledWith(2, 1);
    });
});