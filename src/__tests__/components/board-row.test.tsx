import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BoardRow from '../../components/board-row';
import { SquareState } from '../../types/game-type';
import * as square from '../../components/square';

jest.mock('../../components/square');

describe('BoardRow Component', () => {
    const handleClick = jest.fn();
    const squares: SquareState[] = ["O", "O", "X", "O", "X", "O", "X", "O", "X"];
    let squareSpy: jest.SpyInstance;

    beforeEach(() => {
        squareSpy = jest.spyOn(square, "default");
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders the correct number of squares', () => {
        render(<BoardRow rowIndex={0} rowLength={3} squares={squares} handleClick={handleClick} />);
        expect(squareSpy).toHaveBeenCalledTimes(3);
        Array(3).fill(0).forEach((_, columnIndex) => {
            expect(squareSpy).toHaveBeenNthCalledWith(columnIndex + 1,
                {
                    value: squares[columnIndex],
                    onSquareClick: expect.any(Function),
                },
                {}
            );
        });
    });

    it('calls handleClick when a square is clicked', () => {
        squareSpy.mockImplementation(({ value, onSquareClick }) => {
            return (
                <button className='square' onClick={onSquareClick}>
                    {value}
                </button>
            );
        });
        render(<BoardRow rowIndex={0} rowLength={3} squares={squares} handleClick={handleClick} />);
        const firstSquareButton = screen.getAllByRole('button')[0];
        fireEvent.click(firstSquareButton);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});